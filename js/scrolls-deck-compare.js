function compareDecks() {
    deck1 = JSON.parse($('#deckOne').val());
    deck2 = JSON.parse($('#deckTwo').val());

    types1 = deck1.types;
    types2 = deck2.types;
    var object1 = {};
    var object2 = {};

    for (i in types1) {
        item = object1[types1[i]];
        if (!item) {
            item = 1;
        } else {
            item += 1;
        }
        object1[types1[i]] = item;
    }
    for (i in types2) {
        item = object2[types2[i]];
        if (!item) {
            item = 1;
        } else {
            item += 1;
        }
        object2[types2[i]] = item;
    }

    console.clear();
    console.log('=== INPUTS ===');
    console.log(object1);
    console.log(object2);

    var result = diff(object1, object2);

    processOutput(result);
}

function diff(obj1, obj2) {
    var left = {};
    var right = {};
    var both = {};
    
    for (k in obj1) {
        if (!(k in obj2)) {
            left[k] = obj1[k];
            delete obj1[k];
        } else if (k in obj2) {
            if (obj1[k] == obj2[k]) {
                both[k] = obj1[k];
                delete obj1[k];
                delete obj2[k];
            } else {
                var one = obj1[k];
                var two = obj2[k];
                if (one < two) {
                    both[k] = one;
                    right[k] = two - one;
                } else {
                    both[k] = two;
                    left[k] = one - two;
                }
                delete obj1[k];
                delete obj2[k];
            }
        }
    }
    for (k in obj2) {
        right[k] = obj2[k];
        delete obj2[k];
    }
    
    console.log('=== OUTPUTS ===');
    console.log('Left');
    console.log(left);
    console.log('Right');
    console.log(right);
    console.log('Both');
    console.log(both);
    
    console.log('=== INPUTS NOW ===');
    console.log(obj1);
    console.log(obj2);
    
    return {
        left: left,
        right: right,
        both: both
    }
}

function display(result, scrolls) {
    $('#left div').html('');
    $('#right div').html('');
    $('#both div').html('');
    $('#placeholder').html('');

    for (item in result.left) {
        $('#left div').append('<h4><a href="#scrolls">' + scrolls[item].name + '</a> x' + result.left[item] + '</h4>');
    }
    for (item in result.right) {
        $('#right div').append('<h4><a href="#scrolls">' + scrolls[item].name + '</a> x' + result.right[item] + '</h4>');
    }
    for (item in result.both) {
        $('#both div').append('<h4><a href="#scrolls">' + scrolls[item].name + '</a> x' + result.both[item] + '</h4>');
    }

    scrolldier();
}

function processOutput(result) {
    var scrollList = Object.keys(result.left).concat(
        Object.keys(result.right).concat(
            Object.keys(result.both)
        )
    ).join();

    console.log(scrollList);

    $.ajax({
        url: 'http://a.scrollsguide.com/scrolls?id=' + scrollList + '&norules',
        success: function(response) {
            console.log(response);
            var scrollsData = response.data;
            console.log(scrollsData);
            var scrolls = {};
            for (item in scrollsData) {
                var theItem = scrollsData[item];
                scrolls[theItem.id] = theItem;
            }
            console.log(scrolls);
            display(result, scrolls);
        }
    });
}

$('#theButton').click(function() {
    compareDecks();
});
