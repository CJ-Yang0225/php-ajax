const API_URL = "http://localhost/www";

// encodeURI是為了避免傳送有特殊字元
// query直接撰寫SQL WHERE中的條件式，例如：`name = 'test' AND id = 8` 之類

/**
 * 查詢請求
 * @param {string} table 表名
 * @param {string} query SQL條件式
 * @param {function} callback 回應後的處理
 * @example
 * searchRequest("sample", "id = 8", data => {
 *     if (data.result == true) {
 *         data.table;
 *     }
 * });
 */

function showUsers() {
    searchRequest("personalinformation", "1", data => {
        data.table.forEach(user => {
            document.querySelector('#newDiv').innerHTML += `<div>${user.name} </div>`;
        });
    });
}

function searchRequest(table, query, callback) {
    query = encodeURI(query);

    var xhr = new XMLHttpRequest();

    xhr.open("GET", `${API_URL}/api/search.php?table=${table}&query=${query}`);

    xhr.onload = function() {
        if (xhr.readyState != 4 || xhr.status != 200) return;
        var data = JSON.parse(xhr.responseText);
        callback(data);
    };

    xhr.send();

    return xhr;
}

/**
 * 新增請求
 * @param {string} table 表名
 * @param {object} data 有鍵值的物件，需要對應資料庫欄位
 * @example
 * insertRequest("sample", { "id": 8 }, data => {
 *     if (data.result == true) {
 *         data.id;
 *     }
 * });
 */
function insertRequest(table, data, callback) {
    data = encodeURI(JSON.stringify(data));

    var xhr = new XMLHttpRequest();

    xhr.open("POST", `${API_URL}/api/insert.php`);

    xhr.onload = function() {
        if (xhr.readyState != 4 || xhr.status != 200) return;
        var data = JSON.parse(xhr.responseText);
        callback(data);
    };

    xhr.send(`table=${table}&data=${data}`);

    return xhr;
}

/**
 * 更新請求
 * @param {string} table 表名
 * @param {string} query SQL條件式
 * @param {object} data 有鍵值的物件，需要對應資料庫欄位(將需要更新的傳入即可)
 * @example
 * updateRequest("sample", "id = 8", { "name": "test" }, data => {
 *     if (data.result == true) {
 *     }
 * });
 */
function updateRequest(table, query, data, callback) {
    query = encodeURI(query);
    data = encodeURI(JSON.stringify(data));

    var xhr = new XMLHttpRequest();

    xhr.open("POST", `${API_URL}/api/update.php`);

    xhr.onload = function() {
        if (xhr.readyState != 4 || xhr.status != 200) return;
        var data = JSON.parse(xhr.responseText);
        callback(data);
    };

    xhr.send(`table=${table}&query=${query}&data=${data}`);

    return xhr;
}

/**
 * 更新請求
 * @param {string} table 表名
 * @param {string} query SQL條件式
 * @example
 * deleteRequest("sample", "id = 8", data => {
 *     if (data.result == true) {
 *     }
 * });
 */
function deleteRequest(table, query, callback) {
    query = encodeURI(query);

    var xhr = new XMLHttpRequest();

    xhr.open("POST", `${API_URL}/api/delete.php`);

    xhr.onload = function() {
        if (xhr.readyState != 4 || xhr.status != 200) return;
        var data = JSON.parse(xhr.responseText);
        callback(data);
    };

    xhr.send(`table=${table}&query=${query}`);

    return xhr;
}

function showHint(str) {
    var xhttp;
    if (str.length == 0) {
        document.getElementById("txtHint").innerHTML = "";
        return;
    }
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("txtHint").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "./api/gethint.php?q=" + str, true);
    xhttp.send();
}