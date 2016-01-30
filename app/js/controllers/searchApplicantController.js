/**
 * Created by DugganJ on 05/11/2015.
 */
app.controller('searchApplicantCtrl', function($scope, applicantService) {

    var self = this;
    self.skills = "";
    self.applicants = [];
    self.searched = false;

    self.searchApplicants = function(){
        applicantService.search(self.skills).then(function(response){
            self.searched = true;
            self.applicants = response.data;

            console.log(self.applicants.length);
            if(self.applicants.length == 0){
                self.emptyResultMessage = 'There is no uploaded CVs with this skill set.';
            }
        })
    };

    self.submitSearchInput = function(event){
        if(event.keyCode == 13){
            self.searchApplicants();
        }
    }

});