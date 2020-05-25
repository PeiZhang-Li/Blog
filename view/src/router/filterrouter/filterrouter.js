
let data=JSON.parse(localStorage.getItem('userinfo'));
export  default  function(routearr){
    if(data==null){
        return false;
    }else{
        let arr=[];
        routearr.forEach(item=>{
            if(item.meta.Authority.includes(data.Authority)){
                 arr.push(item);
            }
        })

        return  arr;
    }
}
