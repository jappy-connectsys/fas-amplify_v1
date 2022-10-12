const fixDateReturn = (str, days = 1) => {
    if(str === '' || !str){
        var myDate = new Date();
        return myDate.toISOString();
    }else{
        var myDate = new Date(str);
        myDate.setDate(myDate.getDate() + parseInt(days));
        return myDate.toISOString();
    }
}

export {
    fixDateReturn
}