export const API_KEY = "AIzaSyAP3UPQbcdB_yN0AfNwTYch0J7FuigsxuI"

export const valueConverter = (value) => {
    if(value >= 1000000){
        return Math.floor(value/1000000) + "M" 
    }
    else if(value >= 1000){
        return Math.floor(value/1000) + "K"
    }
    else{
        return value;
    }
}
