function animate(id, index) {
    let end_pos_top = Math.floor(Math.random() * $(window).height()).toString() + "px";
    let end_pos_left = Math.floor(Math.random() * $(window).width()).toString() + "px";
    let animation = anime({
        targets: "#" + id,
        top: end_pos_top,
        left: end_pos_left,
        duration: 500,
        delay: index*100,
        rotate: Math.random().toString() + "turn"
    });
    animation.restart();
}

function createImage(link, num_hits, index) {
    let id = "a" + index.toString()
    const border = $("<div>").addClass("pic-border").attr("id", id);
    const container = $("<div>").addClass("pic-container");
    const img = $("<img>").attr("src", link);
    
    container.append(img);
    border.append(container);
    
    let start_pos_left =  $(window).width()/num_hits*(index+1).toString() + "px";

    border.css({top: "-500px", left: start_pos_left});
    $("#picture-box").append(border);
    animate(id, index);
    border.removeAttr("id");
}

$(document).ready(function() {
    $("#submit-btn").click(function() {
        $.get("https://pixabay.com/api/?key=9598473-d6fb8fe6d3d70f52fdfdfe38d&q=" + $("#search-query").val(), function(data) {
            for(let i = 0; i < data.hits.length; ++i)
            {
                createImage(data.hits[i].webformatURL, data.hits.length, i);
            }
        });
    });
});