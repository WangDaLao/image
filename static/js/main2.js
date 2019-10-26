//导航切换
$(function () {
    $(".navbar-nav").find("li").each(function () {
        var a = $(this).find("a:first")[0];
        if ($(a).attr("href") === location.pathname) {
            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }
    });
});
//初始化spop显示时间
var spopTimeOut = 3000;
var clip = function (el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
};
if(window.console&&window.console.log){console.log("%c Hidove %c https://blog.hidove.cn ","color: #fff; margin: 1em 0; padding: 5px 0; background: #1abc9c;","margin: 1em 0; padding: 5px 0; background: #efefef;");}
document.addEventListener('paste', function (event) {
    var isChrome = false;
    if (event.clipboardData || event.originalEvent) {
        var clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
        if (clipboardData.items) {
            // for chrome
            var items = clipboardData.items,
                len = items.length,
                blob = null;
            isChrome = true;
            event.preventDefault();
            let images = [];
            for (var i = 0; i < len; i++) {
                if (items[i].type.indexOf("image") !== -1) {
                    blob = items[i].getAsFile();
                    images.push(blob);
                }
            }
            if (images.length > 0) {
                uploadBlobFile(images);
            }
            if (blob !== null) {
                let reader = new FileReader();
                reader.onload = function (event) {
                    let base64_str = event.target.result;
                }

            }
        } else {
            //for firefox
        }
    } else {
    }
});

function uploadBlobFile(images) {
    let form = $("#Hidove");
    Swal.fire({
        type: 'warning', // 弹框类型
        title: '上传', //标题
        text: "是否上传粘贴板图片？", //显示内容
        confirmButtonText: '确定',// 确定按钮的 文字
        showCancelButton: true, // 是否显示取消按钮
        cancelButtonText: "取消", // 取消按钮的 文字
        focusCancel: true, // 是否聚焦 取消按钮
        // reverseButtons: true  // 是否 反转 两个按钮的位置 默认是  左边 确定  右边 取消
    }).then(function (isConfirm) {
        if (isConfirm.value) {
            // $.each(images, function( index, blob ) {
            //     form.fileinput('addToStack', blob,index);
            // });
            form.fileinput('readFiles', images);
            spop({
                template: '已添加到上传列表',
                autoclose: spopTimeOut,
                style: 'success'
            });
            // form.fileinput('upload');
        }
        else {
            Swal.close();
        }
    });
}
function generateFileId(file) {
    if (!file) {
        return null;
    }
    var relativePath = String(file.relativePath || file.webkitRelativePath || $h.getFileName(file) || null);
    if (!relativePath) {
        return null;
    }
    return (file.size + '_' + relativePath.replace(/\s/img, '_'));
}
var uploadExtraData = function () {
    var apitype = [];
    $("input[name='apitype']:checked").each(function () {
        apitype.push($(this).val());
    });
    return { apitype };
}