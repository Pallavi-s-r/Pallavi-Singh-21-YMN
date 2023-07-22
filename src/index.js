const express = require('express');
const axios = require('axios');
const app = express();

app.get('/numbers', async (req,res)=>{

    const {url} = req.query;

    if(!url){
        return res.status(400).json({error:"missing url"});

    }

    try{
        const numbers = await getUniqueNumbersFromUrls(url);
        const sortedNumbers = sortNumbers(numbers);
        res.json({numbers:sortedNumbers});
    }catch(err){
        res.status(500).json({err:err})
    }
});


async function getUniqueNumbersFromUrls(urls){
    const numberSet = new Set();
    for(const url of urls){
        try{
            const response = await axios.get(url);
            const jsonData = response.data;

            if(jsonData && Array.isArray(jsonData.numbers)){
                jsonData.numbers.forEach((num)=>numberSet.add(num))
            }
        }catch(err){
            return res.send(err);
        }

    }
    

    return Array.from(numberSet);

}
function sortNumbers(numbers){
    return numbers.sort((a,b)=>a-b);
}

app.listen(8080 , ()=>{
    console.log("server is running on 8080");
})