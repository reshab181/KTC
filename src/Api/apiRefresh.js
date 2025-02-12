import AsyncStorage from "@react-native-async-storage/async-storage";
export async function accessRefresh(token, fun) {
    try {
        
        var myHeaders = new Headers();
        myHeaders.append("jwt", token || "");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        let bodyContent = "access_codename_jwt=GciOiJIUzI1NiJ9&access_codepass_jwt=bGciOiJIkUzI1NiJ9eyJpc3MiOiJrdGNhZG1pbiIsImF1ZCI62Fkb";
        
        let response = await fetch("http://web.gst.fleet.ktcindia.com/user_apis/gettoken.php", { 
            method: "POST",
            body: bodyContent,
            headers: myHeaders
        });
        
        let data = await response.text();
        const res = JSON.parse(data)?.jwt;
        console.log("refetetetetetete________________",res)
       if(res){
        // alert('hhhhyyyyy reftokencalling')
        //    console.log("response ke under  a gya",res)
           await AsyncStorage.setItem("userToken", res)
        //    console.log("token",restoken)
        //    alert('fulll res')
           fun()
        }
    } catch (error) {
        // alert('error JSON.stringify()')
    
      console.error("refresh Error", error);   
    }
    
}