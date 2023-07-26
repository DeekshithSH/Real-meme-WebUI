const FormDevice=document.getElementById("device")
const FormType=document.getElementById("type")
const FormBuild=document.getElementById("build")
// const FormVersion=document.getElementById("version")
const DeviceList=document.getElementById("devicelist")

function showClass(id_name) {
    const element=document.getElementById(id_name)
    element.style.display = "block";
}

function hideClass(id_name) {
    const element=document.getElementById(id_name)
    element.style.display = "none";
}


baseurl="https://deadapi.eu.org"
async function main() {
    try {
        FormDevice.innerHTML=`<option value="none">Select Device</option>`
        const response = await fetch(`${baseurl}/devices`);
        const data = await response.json();
        console.log(data)

        for(var item in data){
            const option = document.createElement("option");
            option.value = item;
            option.text = data[item];
            FormDevice.add(option);
        }
        showClass("device-div")
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function updateTypes(){
    try {
        FormType.innerHTML=`<option value="none">Select Type</option>`
        const response = await fetch(`${baseurl}/types?device=${FormDevice.value}`);
        const data = await response.json();

        console.log(data)

        for(var item in data){
            const option = document.createElement("option");
            option.value = data[item];
            option.text = data[item];
            FormType.add(option);
        }
        showClass("type-div")
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function updateBuilds(){
    try {
        FormBuild.innerHTML=`<option value="none">Select ${FormType.value}</option>`
        const response = await fetch(`${baseurl}/builds?device=${FormDevice.value}&type=${FormType.value}`);
        const data = await response.json();
        
        console.log(data)

        for(var item in data){
            const option = document.createElement("option");
            option.value = data[item];
            option.text = data[item];
            FormBuild.add(option);
        }
        showClass("build-div")
    } catch (error) {
        console.error('Error fetching data:', error);
    } 
}

async function updateVersions(){
    try {
        const response = await fetch(`${baseurl}/versions?device=${FormDevice.value}&type=${FormType.value}&name=${FormBuild.value}`);
        const devicedata = await response.json();
        
        console.log(devicedata)
        
        var div_list=""
        for(var item in devicedata){
            data=devicedata[item]
            var div_status=data["status"]
            if (data["type"]=="Kernel"){div_status="Community"}

            div_list=div_list+`<a class="build" href="/file.html?device=${FormDevice.value}&type=${FormType.value}&id=${data["_id"]}">
            <h5>${data["name"]} ${data["version"]}</h5><br>
            Release Date ${data["release_date"]}<br>
            Status: ${div_status}<br>
            by ${data["dev"]}
            </a>`
        }
        DeviceList.innerHTML=div_list
        showClass("devicelist")
    } catch (error) {
        console.error('Error fetching data:', error);
    }  
}

FormDevice.addEventListener("change", updateTypes);
FormType.addEventListener("change", updateBuilds);
FormBuild.addEventListener("change", updateVersions);
main();