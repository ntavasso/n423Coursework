var SERVER = (function () {
    var _allSpeakers = [];
    var _allSections = [];

    var _loadData = function () {
        $.getJSON('data/data.json', function (data) {
            console.log(data);
            _allSpeakers = data.Speakers;
            _allSections = data.Sections;

            console.log('allSpeakers ', _allSections);
        });
    };

    var _getAllSpeakers = function () {
        return _allSpeakers;
    };
    var _getSection = function (sectionYouWant) {
        let sec = {};
        $.each(_allSections, function (idx, section) {
            if (section.sectionName == sectionYouWant) {
                sec = section.sectionContent;
                // console.log('section name ', section);
                // return section;

            }
        });
        return sec;
    };


    _loadData();

    //makes public
    return {
        // showAlert: _showAlert,
        loadData: _loadData,
        getAllSpeakers: _getAllSpeakers,
        getSection: _getSection
    };
})();