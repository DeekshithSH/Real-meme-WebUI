const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const dl_div = document.getElementById("dl_div")
baseurl = "https://rem.deadbots.eu.org/api"

console.log(params)
id = params.id
type = params.type
device = params.device

async function main() {
    const response = await fetch(`${baseurl}/file?device=${device}&type=${type}&id=${id}`);
    const data = await response.json();

    var script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?5";
    script.setAttribute("data-telegram-post", `${data["channel_username"]}/${data["msg_id"]}`);
    script.setAttribute("data-userpic", "true")
    script.setAttribute("data-width", "100%");
    script.setAttribute("data-dark", "1")
    document.getElementById("tg-post").appendChild(script);

    update_text("build-name", data["name"] + " " + data["version"])
    update_text("type", type)
    update_text("dev", "by " + data["dev"])
    document.getElementById("dev").href = `//t.me/${data["dev"]}`
    update_text("release_date", "released on " + data["release_date"])
    dl_list = data["download_link"]
    dl_btn = ""
    for (var item in dl_list) {
        dl_btn += `<div class="dl_button">
        <a href="${dl_list[item]}">${item}</a>
        </div>`
    }
    dl_div.innerHTML = dl_btn


    function update_text(id_name, new_text) {
        element = document.getElementById(id_name)
        element.innerHTML = new_text
    }
}
main()