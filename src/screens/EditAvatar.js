import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../common/Header';
import images from '../../assets/images';
import { connect } from 'react-redux';
import apiService from "../firebase/FirebaseHelper";
import AsyncStorage from "@react-native-community/async-storage";
import {USER} from "../actions/types";
import { setUser as setUserAction } from "../actions/login";
import normalize from "react-native-normalize/src/index";
import SimpleButton from "../common/SimpleButton";
import {FEMALE_PROFILE_PROPS, GENDER_FEMALE, MALE_PROFILE_PROPS} from "../constants/constants";
import random from "../common/random";
import {showToast} from "../common/info";


class EditAvatar extends React.Component {
    constructor(props) {
        super(props)
        let profile = props.route.params?.profile;
        let gender = profile?.gender??'male';
        this.state = {
            id: profile?.id??null,
            firstName: profile?.firstName??'',
            lastName: profile?.lastName??'',
            location: profile?.location??'',
            gender: gender,
            hair: 1,
            eyerow: 1,
            eye: 1,
            nose: 1,
            lip: 1,
            profileProps: gender === GENDER_FEMALE?FEMALE_PROFILE_PROPS:MALE_PROFILE_PROPS,
            loading: false
        }
    }

    componentDidMount() {
        // const { skinColor, accessory, nailColor, handTattoo, spadezDeck, spadezTable } = this.props.auth
        // this.setState({
        //     skinColor, accessory, nailColor, handTattoo, spadezDeck, spadezTable
        // })
    }

    _onPressSave = () => {
        const { id, firstName, lastName, location, gender, hair, eyerow, eye, nose, lip } = this.state;
        const { auth, setUser } = this.props;

        const character = {
            id,
            firstName,
            lastName,
            location,
            gender,
            hair,
            eyerow,
            eye,
            nose,
            lip
        };

        let characters = auth?.characters??[];
        if(id && characters.find(item => item.id === id)){
            characters = characters.filter(item => item.id !== id);
        }

        let characterSelectedId = auth.characterSelectedId;
        if(!character.id){
            character.id = random(13);
            characterSelectedId = character.id;
        }
        characters.push(character);

        this.setState({ loading: true });

        apiService.updateProfileForUser(auth.user, { characterSelectedId, characters }, (res) => {
            if (res.isSuccess) {
                console.log('updateProfile', res.response);
                AsyncStorage.setItem('USER', JSON.stringify(res.response));
                setUser(res.response);
                showToast('Profile is saved Successfully');
                this.props.navigation.navigate('UserProfile');
            } else {
                showToast('Save Profile Failed!');
                console.log('error', res.message);
            }
            this.setState({ loading: false });
        })
    }

    getBtnStyle(id, length) {
        if (id === 0) {
            return styles.typeViewBtnLeft
        }
        else if (id === length - 1) {
            return styles.typeViewBtnRight
        }
        else {
            return styles.typeViewBtnMiddle
        }
    }

    render() {
        const { gender, hair, eyerow, eye, nose, lip, profileProps, loading } = this.state
        // const { skinColor, accessory, nailColor, handTattoo, spadezDeck, spadezTable } = this.props.auth
        // console.log(this.props.auth)

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.mainContainer}>
                    <Header onPress={() => this.props.navigation.pop()} bgColor={'#250901'} headerBorderWidth={2} imgLeft={images.ic_back} title={'EDIT AVATAR'} />
                    <ScrollView style={{ flexGrow: 1, height: '100%' }}>
                        <View style={{
                            alignItems: 'center',
                            marginTop: '4%',
                        }}>
                            <View style={styles.preview}>
                                <Text style={{ color: '#ffffff', fontFamily: 'Montserrat-Regular' }}>PREVIEW</Text>
                            </View>
                            <View style={{
                                marginTop: hp(1),
                                backgroundColor: '#250901',
                                height: hp(30),
                                width: wp(90),
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 3,
                                borderColor: '#E83528',
                                borderRadius: 7,
                            }}>
                                <Image style={{ height: '80%', width: '80%', resizeMode: 'contain', }} source={gender === GENDER_FEMALE?images.female_preview_1:images.male_preview_1} />
                            </View>
                        </View>
                        <View style={styles.contentContainer}>
                            <View style={styles.textView}>
                                <Text style={styles.text}>HAIR</Text>
                            </View>
                            <View style={styles.typeView}>
                                <View style={styles.typeInnerView}>
                                    {profileProps.hairs && profileProps.hairs.map((item, i) => {
                                        const btnStyle = this.getBtnStyle(i, profileProps.hairs.length)
                                        const backgroundColor = item.id === hair ? 'red' : '#460000'
                                        return (
                                            <TouchableOpacity
                                                key={i}
                                                onPress={() => this.setState({hair: item.id})}
                                                style={[btnStyle, { backgroundColor: backgroundColor }]}
                                            >
                                                <Image style={{ height: '60%', width: '80%', resizeMode: 'contain', }} source={item.value} />
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text}>EYEBROWS</Text>
                            </View>
                            <View style={styles.typeView}>
                                <View style={styles.typeInnerView}>
                                    {profileProps.eyerows && profileProps.eyerows.map((item, i) => {
                                        const btnStyle = this.getBtnStyle(i, profileProps.eyerows.length)
                                        const backgroundColor = eyerow === item.id ? 'red' : '#460000'
                                        return (
                                            <TouchableOpacity
                                                key={i}
                                                onPress={() => this.setState({eyerow: item.id})}
                                                style={[btnStyle, { backgroundColor: backgroundColor }]}
                                            >
                                                <Image style={{ height: '60%', width: '80%', resizeMode: 'contain', }} source={item.value} />
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text}>EYES</Text>
                            </View>
                            <View style={styles.typeView}>
                                <View style={styles.typeInnerView}>
                                    {profileProps.eyes && profileProps.eyes.map((item, i) => {
                                        const btnStyle = this.getBtnStyle(i, profileProps.eyes.length)
                                        const backgroundColor = eye === item.id ? 'red' : '#460000'
                                        return (
                                            <TouchableOpacity
                                                key={i}
                                                onPress={() => this.setState({eye: item.id})}
                                                style={[btnStyle, { backgroundColor: backgroundColor }]}
                                            >
                                                <Image style={{ height: '60%', width: '80%', resizeMode: 'contain', }} source={item.value} />
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text}>NOSE</Text>
                            </View>
                            <View style={styles.typeView}>
                                <View style={styles.typeInnerView}>
                                    {profileProps.noses && profileProps.noses.map((item, i) => {
                                        const btnStyle = this.getBtnStyle(i, profileProps.noses.length)
                                        const backgroundColor = nose === item.id ? 'red' : '#460000'
                                        return (
                                            <TouchableOpacity
                                                key={i}
                                                onPress={() => this.setState({nose: item.id})}
                                                style={[btnStyle, { backgroundColor: backgroundColor }]}
                                            >
                                                <Image style={{ height: '60%', width: '80%', resizeMode: 'contain', }} source={item.value} />
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text}>LIPS</Text>
                            </View>
                            <View style={styles.typeView}>
                                <View style={styles.typeInnerView}>
                                    {profileProps.lips && profileProps.lips.map((item, i) => {
                                        const btnStyle = this.getBtnStyle(i, profileProps.lips.length)
                                        const backgroundColor = lip === item.id ? 'red' : '#460000'
                                        return (
                                            <TouchableOpacity
                                                key={i}
                                                onPress={() => this.setState({lip: item.id})}
                                                style={[btnStyle, { backgroundColor: backgroundColor }]}
                                            >
                                                <Image style={{ height: '60%', width: '80%', resizeMode: 'contain' }} source={item.value} />
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </View>
                            <View style={styles.viewBottom}>
                                <SimpleButton
                                    onPress={this._onPressSave}
                                    btnHeight={hp(6)}
                                    btnWidth={wp(75)}
                                    textColor={'#000000'} title={'SAVE'}
                                    loading={loading}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        height: hp(100),
        width: wp(100),
        backgroundColor: '#881000',
    },
    contentContainer: {
        width: wp(100),
        alignItems: 'center'
        // backgroundColor:'#881000',
    },
    text: {
        fontSize: wp(3.6),
        // fontWeight:'bold',
        color: '#fff',
        textAlign: 'center',
        paddingTop: '2%',
        fontFamily: 'Montserrat-Regular'
    },
    textView: {
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'flex-start',
        // backgroundColor: 'green'
    },
    typeView: {
        alignItems: 'flex-start'
    },
    typeInnerView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(5),
        width: wp(80),
        // backgroundColor: 'green',
        borderTopLeftRadius: wp(5),
        borderBottomLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
        borderBottomRightRadius: wp(5)
    },
    typeViewBtnLeft: {
        backgroundColor: 'red',
        height: '100%',
        width: wp(25),
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: wp(5),
        borderBottomLeftRadius: wp(5),
    },
    typeViewBtnRight: {
        backgroundColor: '#460000',
        height: '100%',
        width: wp(25),
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: wp(5),
        borderBottomRightRadius: wp(5)
    },
    typeViewBtnMiddle: {
        backgroundColor: '#460000',
        height: '100%',
        width: wp(25),
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBtn: {
        color: '#fff',
        fontSize: wp(3.6),
        fontFamily: 'Montserrat-Bold'
    },
    preview: {
        height: '10%',
        width: '40%',
        backgroundColor: '#881000',
        borderWidth: 2,
        borderColor: '#E83528',
        borderRadius: wp(7),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: hp(-0.7),
        bottom: hp(0),
        left: wp(30),
        right: 0,
        zIndex: 1,
    },
    viewBottom: {
        height: hp(15),
        // backgroundColor:'gold',
        justifyContent: 'flex-start',
        marginTop: hp(6),
    }
});

const mapDispatchToProps = (dispatch) => ({
    setUser: (params) => dispatch(setUserAction(params)),
    dispatch
})

const mapStateToProps = (state) => ({
    auth: state.login.profile
})

export default connect(mapStateToProps, mapDispatchToProps)(EditAvatar)