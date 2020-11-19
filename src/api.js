const searchApi = async (term)=>{
    let promise = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(['apple','aeroplane']);
        },1000);
    })
    let response = await promise;
    console.log(response);
}