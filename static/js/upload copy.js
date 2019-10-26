fileinput();
function fileinput() {
    $("#Hidove").fileinput({
        language: 'en',
        theme: "fas",
        previewFileType: "image",
        uploadUrl: 'upload.php',
        uploadExtraData: function (previewId, index) {   //额外参数的关键点
            return uploadExtraData();
        },
        allowedFileExtensions: ['jpeg', 'jpg', 'png', 'gif', 'ico'],
        overwriteInitial: false,
        showClose: false,
        maxFileSize: 5120,
        maxFileCount: 10,
        uploadAsync: true,
        browseClass: "btn btn-secondary",
        browseLabel: "Select Image(s)",
        removeClass: "btn btn-danger",
        removeLabel: "Clear",
        uploadClass: "btn btn-info",
        uploadLabel: "Upload",
        dropZoneTitle: "Drag & drop files here ...<br>or<br>Copy & paste screenshots here ..."
    }).on("fileuploaded", function (event, data, previewId, index) {
        var form = data.form, files = data.files, extra = data.extra, response = data.response, reader = data.reader;
        if (response.code == '200') {
            if ($("showurl").css("display")) {
            } else if (response.data.url) {
                $("#showurl").show();
            }
            var imageUrl = response.data.url;
            var index = 0;
            for (var key in imageUrl) {
                index++;
                if (index == 1) {
                    var urlcode = `<tr><td class="Hidove-imageucode-cover" width="100px" rowspan="` + Object.getOwnPropertyNames(imageUrl).length + `"><img src="`
                        + imageUrl[key] + `"/></td><td><span class="Hidove-imageucode-tip">` + key + `</span><input type="text" class="form-control" onfocus="this.select();" value="`
                        + imageUrl[key] + `"></td></tr>`;
                    var htmlcode = `<tr><td class="Hidove-imageucode-cover" width="100px" rowspan="` + Object.getOwnPropertyNames(imageUrl).length + `"><img src="`
                        + imageUrl[key] + `"/></td><td><span class="Hidove-imageucode-tip">` + key + `</span><input type="text" class="form-control" onfocus="this.select();" value="&lt;img src=&quot;`
                        + imageUrl[key] + `&quot;/&gt;"></td></tr>`;
                    var bbcode = `<tr><td class="Hidove-imageucode-cover" width="100px" rowspan="` + Object.getOwnPropertyNames(imageUrl).length + `"><img src="`
                        + imageUrl[key] + `"/></td><td><span class="Hidove-imageucode-tip">` + key + `</span><input type="text" class="form-control" onfocus="this.select();" value="[img]`
                        + imageUrl[key] + `[/img]"></td></tr>`;
                    var markdown = `<tr><td class="Hidove-imageucode-cover" width="100px" rowspan="` + Object.getOwnPropertyNames(imageUrl).length + `"><img src="`
                        + imageUrl[key] + `"/></td><td><span class="Hidove-imageucode-tip">` + key + `</span><input type="text" class="form-control" onfocus="this.select();" value="![](`
                        + imageUrl[key] + `)"></td></tr>`;
                    var markdownlinks = `<tr><td class="Hidove-imageucode-cover" width="100px" rowspan="` + Object.getOwnPropertyNames(imageUrl).length + `"><img src="`
                        + imageUrl[key] + `"/></td><td><span class="Hidove-imageucode-tip">` + key + `</span><input type="text" class="form-control" onfocus="this.select();" value="[![`
                        + imageUrl[key] + `](`
                        + imageUrl[key] + `)](`
                        + imageUrl[key] + `)"></td></tr>`;
                } else {
                    urlcode = urlcode + `<tr><td><span class="Hidove-imageucode-tip">` + key + `</span><input type="text" class="form-control" onfocus="this.select();" value="` + imageUrl[key] + `"></td></tr>`;
                    htmlcode = htmlcode + `<tr><td><span class="Hidove-imageucode-tip">` + key + `</span><input type="text" class="form-control" onfocus="this.select();" value="&lt;img src=&quot;` + imageUrl[key] + `&quot;/&gt;"></td></tr>`;
                    bbcode = bbcode + `<tr><td><span class="Hidove-imageucode-tip">` + key + `</span><input type="text" class="form-control" onfocus="this.select();" value="[img]` + imageUrl[key] + `[/img]"></td></tr>`;
                    markdown = markdown + `<tr><td><span class="Hidove-imageucode-tip">` + key + `</span><input type="text" class="form-control" onfocus="this.select();" value="![](` + imageUrl[key] + `)"></td></tr>`;
                    markdownlinks = markdownlinks + `<tr><td><span class="Hidove-imageucode-tip">` + key + `</span><input type="text" class="form-control" onfocus="this.select();" value="[![` + imageUrl[key] + `](` + imageUrl[key] + `)](` + imageUrl[key] + `)"></td></tr>`;
                }
            }
            urlcode = urlcode + `</tr>`;
            htmlcode = htmlcode + `</tr>`;
            bbcode = bbcode + `</tr>`;
            markdown = markdown + `</tr>`;
            markdownlinks = markdownlinks + `</tr>`;
            $('#urlcodes').append(urlcode);
            $('#htmlcodes').append(htmlcode);
            $('#bbcodes').append(bbcode);
            $('#markdowncodes').append(markdown);
            $('#markdowncodes2').append(markdownlinks);
        } else {
            spop({
                template: response.msg,
                autoclose: spopTimeOut,
                style: 'error',
                position: 'top-center',
            });
        }
    });
}
