import images from "../../assets/images";

export const server_url = 'http://192.168.1.35:55555';
export const PLAYER_ONE = 1;
export const PLAYER_TWO = 2;
export const PLAYER_THREE = 3;
export const PLAYER_FOUR = 4;
export const NAME = 'NAME';
export const BID = 'BID';
export const TEAM_ONE = 'TEAM_ONE';
export const TEAM_TWO = 'TEAM_TWO';
export const DARK = 'DARK';
export const LIGHT = 'LIGHT';
export const ORIGINAL = 'Original';
export const BLUE = 'Blue';
export const ORANGE = 'Orange';
export const GREEN = 'Green';
export const DARK_ORIGINAL = 'Dark Original';
export const VOLT_BLUE = 'Volt Blue';
export const MINT_GREEN = 'Mint Green';
export const SEA_FOAM = 'Sea Foam';
export const DARK_SEA_FOAM = 'Sea Foam ';
export const VIOLET = 'Violet';
export const PEACH = 'Peach';
export const GENDER_MALE = 'male';
export const GENDER_FEMALE = 'female';

export const MALE_PROFILE_PROPS = {
    shapes: [{id:1, value:'Shape 1'}, {id:2, value:'Shape 2'}, {id:3, value:'Shape 3'}],
    skins: [{id:1, value:'#ead2b9', image: 'light'}, {id:2, value:'#4d3418', image: 'brown'}, {id:3, value:'#22160b', image: 'dark'}],
    hairs: [{id:1, value:1, image: images.male_hair_yellow_1}, {id:2, value:2, image: images.male_hair_yellow_2}, {id:3, value:3, image: images.male_hair_yellow_3}],
    hairColors: [{id:1, value:'Color 1', image: 'yellow'}, {id:2, value:'Color 2', image: 'red'}, {id:3, value:'Color 3', image: 'dark'}],
    eyes: [{id:1, value:images.male_eyes_1}, {id:2, value:images.male_eyes_2}, {id:3, value:images.male_eyes_3}],
}
export const FEMALE_PROFILE_PROPS = {
    shapes: [{id:1, value:'Shape 1'}, {id:2, value:'Shape 2'}, {id:3, value:'Shape 3'}],
    skins: [{id:1, value:'#ead2b9', image: 'light'}, {id:2, value:'#4d3418', image: 'brown'}, {id:3, value:'#22160b', image: 'dark'}],
    hairs: [{id:1, value:1, image: images.female_hair_yellow_1}, {id:2, value:2, image: images.female_hair_yellow_2}, {id:3, value:3, image: images.female_hair_yellow_3}],
    hairColors: [{id:1, value:'Color 1', image: 'yellow'}, {id:2, value:'Color 2', image: 'red'}, {id:3, value:'Color 3', image: 'dark'}],
    eyes: [{id:1, value:images.female_eyes_1}, {id:2, value:images.female_eyes_2}, {id:3, value:images.female_eyes_3}],
}
export const PLAYER_PROPS = {
    skinColors: [{id:1, value:'#ead2b9', image: images.hand_skin_1, rimage: images.hand_skin_r_1}, {id:2, value:'#4d3418', image: images.hand_skin_2, rimage: images.hand_skin_r_2}, {id:3, value:'#22160b', image: images.hand_skin_3, rimage: images.hand_skin_r_3}],
    nailColors: [{id:1, value:'#eaebeb', image: images.hand_nail_1}, {id:2, value:'#f83636', image: images.hand_nail_2}, {id:3, value:'#6ca6ed', image: images.hand_nail_3}],
    accessories: [{id:'bracelet', value:'Bracelet', image: images.hand_accessory_bracelet}, {id:'watch', value:'Watch', image: images.hand_accessory_watch}, {id:'ring', value:'Ring', image: images.hand_accessory_ring}],
    spadezDecks: [{id:'red', value:images.card_back_red}, {id:'green', value:images.card_back_green}, {id:'blue', value:images.card_back_blue}],
    spadezTables: [{id:1, value:'#a01107'}, {id:2, value:'#323b08'}, {id:3, value:'#0d2c53'}],
}

