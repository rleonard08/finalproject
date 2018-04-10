console.log("canvas is running");
var canvas = document.getElementById("sign");
// try {
if (canvas.getContext) {
    var context = canvas.getContext("2d");
    console.log("working canvas");
} else {
    alert("Your browser does not support <canvas> element");
}

$("#sign").on("mousedown", function(e) {
    console.log("mousedown firing");
    if (e.target === document.querySelector("#sign")) {
        (function(context) {
            context.beginPath();
        })(context);
        $(document).on("mousemove.draw", function(e) {
            console.log("mousemove firing");
            e.preventDefault();
            (function(context) {
                context.strokeStyle = "black";
                context.lineTo(
                    e.pageX - canvas.offsetLeft,
                    e.pageY - canvas.offsetTop
                );
                console.log(
                    e.pageX - canvas.offsetLeft,
                    e.pageY - canvas.offsetTop
                );
                context.stroke();
            })(context);
        });
        $(document).on("mouseup.draw", function(e) {
            let signImg = canvas.toDataURL();
            console.log("mouesup is firing");
            $(document).off("mousemove.draw");
            $(document).off("mouseup.draw");
            $("#field").val(signImg);
        });
    }
});
