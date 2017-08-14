// JavaScript source code

var zips = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: '../data/zips.json'
});

$('#prefetch .typeahead').typeahead(null, {
    name: 'zips',
    source: zips
});