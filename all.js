// 抓資料
farm_data = [];

//axios.get('https://hexschool.github.io/js-filter-data/data.json')
axios.get('https://data.moa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx?IsTransData=1&UnitId=037')
  .then(function (response) {
    farm_data = response.data;

    renderNowSearch();
});

// 搜尋功能
now_search = "";
now_data = [];
const crop = document.querySelector("#crop");
const search = document.querySelector(".search");
const show_result =  document.querySelector(".show-result");
const showList = document.querySelector(".showList");

search.addEventListener("click",function(e){
    show_result.textContent = `查看「${crop.value}」的比價結果`;

    str = "";
    now_data = [];
    farm_data.forEach(item => {
        if(item.作物名稱.includes(crop.value) == true){
            str += `<tr><td>${item.作物名稱}</td><td>${item.市場名稱}</td>
            <td>${item.上價}</td>
            <td>${item.中價}</td>
            <td>${item.下價}</td>
            <td>${item.平均價}</td>
            <td>${item.交易量}</td></tr>`;
            now_data.push(item);
        }
    });
    showList.innerHTML = str;
    
    if (str == ""){
        showList.innerHTML = `<tr><td colspan="7" class="text-center p-3">查詢不到當日的交易資訊QQ</td></tr>`;
    }
    if (farm_data.length == 0){
        showList.innerHTML = `<tr><td colspan="7" class="text-center p-3">資料載入中...</td></tr>`;
    }
});

// 種類按鈕功能
const btn_type = document.querySelectorAll(".btn-type");
btn_type.forEach(item => {
    item.addEventListener("click",function(e){
        show_result.textContent = `查看「${e.target.textContent}」的比價結果`;
        now_search = e.target.getAttribute("data-type");

        str = "";
        now_data = [];
        farm_data.forEach(item => {
            if(item.種類代碼 == e.target.getAttribute("data-type")){
                str += `<tr><td>${item.作物名稱}</td><td>${item.市場名稱}</td>
                <td>${item.上價}</td>
                <td>${item.中價}</td>
                <td>${item.下價}</td>
                <td>${item.平均價}</td>
                <td>${item.交易量}</td></tr>`;
                now_data.push(item);
            }
        });

        showList.innerHTML = str;
        if (farm_data.length == 0){
            showList.innerHTML = `<tr><td colspan="7" class="text-center p-3">資料載入中...</td></tr>`;
        }
    })
});

// 資料載入後找目前搜尋
function renderNowSearch(){
    str = "";
    now_data = [];
    // 資料載入前搜尋種類
    if(now_search == "N04" || now_search == "N05" || now_search == "N06"){
        farm_data.forEach(item => {
            if(item.種類代碼 == now_search){
                str += `<tr><td>${item.作物名稱}</td><td>${item.市場名稱}</td>
                <td>${item.上價}</td>
                <td>${item.中價}</td>
                <td>${item.下價}</td>
                <td>${item.平均價}</td>
                <td>${item.交易量}</td></tr>`;
                now_data.push(item);
            }
        });

        showList.innerHTML = str;

        return;
    }

    // 資料載入前搜尋名稱
    if (crop.value != ""){
        farm_data.forEach(item => {
            if(item.作物名稱.includes(crop.value) == true){
                str += `<tr><td>${item.作物名稱}</td><td>${item.市場名稱}</td>
                <td>${item.上價}</td>
                <td>${item.中價}</td>
                <td>${item.下價}</td>
                <td>${item.平均價}</td>
                <td>${item.交易量}</td></tr>`;
                now_data.push(item);
            }
        });
        showList.innerHTML = str;
        if (str == ""){
            showList.innerHTML = `<tr><td colspan="7" class="text-center p-3">查詢不到當日的交易資訊QQ</td></tr>`;
            return;
        }
    }

    if (str == ""){
        showList.innerHTML = `<tr><td colspan="7" class="text-center p-3">請輸入並搜尋想比價的作物名稱^＿^</td></tr>`;
    };
}

// 下拉排序功能
const mobile_select = document.querySelector(".mobile-select");
const sort_select = document.querySelector(".sort-select");

function dataSort(){
    if (now_data.length == 0){
        sort_select.options[0].selected = true;
        return;
    };
    if(sort_select.value == "依上價排序"){
        now_sort_data =  now_data.sort((a, b) => {
            return a.上價 - b.上價;
        });
        sortTitle.forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute("data-price") == "上價" && item.getAttribute("data-sort") == "down"){
                item.classList.add('active');
            }
            last_sort = "上價";
            now_sort = "上價";
        });
    }else if(sort_select.value == "依中價排序"){
        now_sort_data.sort((a, b) => {
            return a.中價 - b.中價;
        });
        sortTitle.forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute("data-price") == "中價" && item.getAttribute("data-sort") == "down"){
                item.classList.add('active');
            }
            last_sort = "中價";
            now_sort = "中價";
        });
    }else if(sort_select.value == "依下價排序"){
        now_sort_data.sort((a, b) => {
            return a.下價 - b.下價;
        });
        sortTitle.forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute("data-price") == "下價" && item.getAttribute("data-sort") == "down"){
                item.classList.add('active');
            }
            last_sort = "下價";
            now_sort = "下價";
        });
    }else if(sort_select.value == "依平均價排序"){
        now_sort_data.sort((a, b) => {
            return a.平均價 - b.平均價;
        });
        sortTitle.forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute("data-price") == "平均價" && item.getAttribute("data-sort") == "down"){
                item.classList.add('active');
            }
            last_sort = "平均價";
            now_sort = "平均價";
        });
    }else if(sort_select.value == "依交易量排序"){
        now_sort_data.sort((a, b) => {
            return a.交易量 - b.交易量;
        });
        sortTitle.forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute("data-price") == "交易量" && item.getAttribute("data-sort") == "down"){
                item.classList.add('active');
            }
            last_sort = "交易量";
            now_sort = "交易量";
        });
    }
    str = "";
    now_sort_data.forEach(item => {
        str += `<tr><td>${item.作物名稱}</td><td>${item.市場名稱}</td>
        <td>${item.上價}</td>
        <td>${item.中價}</td>
        <td>${item.下價}</td>
        <td>${item.平均價}</td>
        <td>${item.交易量}</td></tr>`;
    });

    showList.innerHTML = str;

    sort_select.options[0].selected = true;
}

function dataMobileSort(){
    if (now_data.length == 0){
        mobile_select.options[0].selected = true;
        return;
    };
    if(mobile_select.value == "上價"){
        now_sort_data =  now_data.sort((a, b) => {
            return a.上價 - b.上價;
        });
        sortTitle.forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute("data-price") == "上價" && item.getAttribute("data-sort") == "down"){
                item.classList.add('active');
            }
            last_sort = "上價";
            now_sort = "上價";
        });
    }else if(mobile_select.value == "中價"){
        now_sort_data =  now_sort_data.sort((a, b) => {
            return a.中價 - b.中價;
        });
        sortTitle.forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute("data-price") == "中價" && item.getAttribute("data-sort") == "down"){
                item.classList.add('active');
            }
            last_sort = "中價";
            now_sort = "中價";
        });
    }else if(mobile_select.value == "下價"){
        now_sort_data =  now_sort_data.sort((a, b) => {
            return a.下價 - b.下價;
        });
        sortTitle.forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute("data-price") == "下價" && item.getAttribute("data-sort") == "down"){
                item.classList.add('active');
            }
            last_sort = "下價";
            now_sort = "下價";
        });
    }else if(mobile_select.value == "平均價"){
        now_sort_data =  now_data.sort((a, b) => {
            return a.平均價 - b.平均價;
        });
        sortTitle.forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute("data-price") == "平均價" && item.getAttribute("data-sort") == "down"){
                item.classList.add('active');
            }
            last_sort = "平均價";
            now_sort = "平均價";
        });
    }else if(mobile_select.value == "交易量"){
        now_sort_data =  now_data.sort((a, b) => {
            return a.交易量 - b.交易量;
        });
        sortTitle.forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute("data-price") == "交易量" && item.getAttribute("data-sort") == "down"){
                item.classList.add('active');
            }
            last_sort = "交易量";
            now_sort = "交易量";
        });
    }
    str = "";
    now_sort_data.forEach(item => {
        str += `<tr><td>${item.作物名稱}</td><td>${item.市場名稱}</td>
        <td>${item.上價}</td>
        <td>${item.中價}</td>
        <td>${item.下價}</td>
        <td>${item.平均價}</td>
        <td>${item.交易量}</td></tr>`;
    });

    showList.innerHTML = str;

    mobile_select.options[0].selected = true;
}

// 標題排序功能
const sort_button = document.querySelectorAll(".sort_button");
now_sort = "";
last_sort = "";
sortUpDown = [
    {
        clickButton:"上價",
        up:false,
        down:false
    },
    {
        clickButton:"中價",
        up:false,
        down:false
    },
    {
        clickButton:"下價",
        up:false,
        down:false
    },
    {
        clickButton:"平均價",
        up:false,
        down:false
    },
    {
        clickButton:"交易量",
        up:false,
        down:false
    }
]

sort_button.forEach(item => {
    item.addEventListener("click",function(e){
        if (now_data.length == 0){
            return;
        };
        now_sort = e.target.getAttribute("data-price");
        renewSort();
        ifDownActive = e.target.parentNode.lastChild.previousSibling;
        ifUpActive = e.target.parentNode.firstChild.nextSibling;
        if(ifDownActive.classList.contains('active') == false){
            if(ifUpActive.classList.contains('active') == false){
                ifDownActive.classList.toggle('active');
                sortUpDown.forEach(item => {
                    if(e.target.getAttribute("data-price") == item.clickButton){
                        item.up = true;
                    }
                });
                dataTitleSort();
                return;
            }
            if(ifUpActive.classList.contains('active') == true){
                ifUpActive.classList.toggle('active');
                ifDownActive.classList.toggle('active');
                sortUpDown.forEach(item => {
                    if(e.target.getAttribute("data-price") == item.clickButton){
                        item.down = false;
                        item.up = true;
                    }                    
                });
                dataTitleSort();
                return;
            }
        }
        if(ifUpActive.classList.contains('active') == false){
            if(ifDownActive.classList.contains('active') == true){
                ifUpActive.classList.toggle('active');
                ifDownActive.classList.toggle('active');
                sortUpDown.forEach(item => {
                    if(e.target.getAttribute("data-price") == item.clickButton){
                        item.down = true;
                        item.up = false;
                    }                    
                });
                dataTitleSort();
                return;
            }
        }
    });
});

// 刷新篩選
const sortTitle = document.querySelectorAll(".bi");
function renewSort(){
    if(now_sort != last_sort){
        sortTitle.forEach(item => {
            item.classList.remove('active');
            last_sort = now_sort;
        });
        sortUpDown.forEach(item => {
            item.up = false;
            item.down = false;
        });
    }
}

function dataTitleSort(){
    now_sort_data = now_data;
    sortUpDown.forEach((item,index) => {
        if(item.up == true){
            if (index == 0){
                now_sort_data.sort((a, b) => {
                    return a.上價 - b.上價;
                });
            }
            if (index == 1){
                now_sort_data.sort((a, b) => {
                    return a.中價 - b.中價;
                });
            }
            if (index == 2){
                now_sort_data.sort((a, b) => {
                    return a.下價 - b.下價;
                });
            }
            if (index == 3){
                now_sort_data.sort((a, b) => {
                    return a.平均價 - b.平均價;
                });
            }
            if (index == 4){
                now_sort_data.sort((a, b) => {
                    return a.交易量 - b.交易量;
                });
            }
        }
        if(item.down == true){
            if (index == 0){
                now_sort_data.sort((a, b) => {
                    return b.上價 - a.上價;
                });
            }
            if (index == 1){
                now_sort_data.sort((a, b) => {
                    return b.中價 - a.中價;
                });
            }
            if (index == 2){
                now_sort_data.sort((a, b) => {
                    return b.下價 - a.下價;
                });
            }
            if (index == 3){
                now_sort_data.sort((a, b) => {
                    return b.平均價 - a.平均價;
                });
            }
            if (index == 4){
                now_sort_data.sort((a, b) => {
                    return b.交易量 - a.交易量;
                });
            }
        }
    });

    str = "";
    now_sort_data.forEach(item => {
        str += `<tr><td>${item.作物名稱}</td><td>${item.市場名稱}</td>
        <td>${item.上價}</td>
        <td>${item.中價}</td>
        <td>${item.下價}</td>
        <td>${item.平均價}</td>
        <td>${item.交易量}</td></tr>`;
    });

    showList.innerHTML = str;
}