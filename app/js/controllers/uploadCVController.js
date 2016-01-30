/**
 * Created by DugganJ on 05/11/2015.
 */
app.controller('uploadCVCtrl', function($scope, applicantService) {
    self = this;
    self.filesAdded = [];
    self.appStatus = "processing";

    $scope.$on('flow::fileAdded', function (event, $flow, flowFile) {
        self.appStatus = "processing";
        var file = {
                        id:"",
                        fileName: flowFile.file.name,
                        applicantName : "",
                        status: "Uploading"
                    };

        self.filesAdded.push(file);
        var reader = new FileReader();

        reader.onload = function(readerEvt) {
           applicantService.upload( btoa(readerEvt.target.result), flowFile.file.name)
               .then(function(response){
                   file.id = response.data.id;
                   file.applicantName = response.data.name;
                   file.status = "Saved";
                   self.appStatus = "ready";
           });
        };

        reader.readAsBinaryString(flowFile.file);
    });

    self.updateApplicantName = function(file){
        file.status = "Updating";
        self.appStatus = "processing";

        applicantService.updateApplicantName(file.id, file.applicantName)
            .then(function(response){
                file.status = "Updated";
                self.appStatus = "ready";
            });
    };

    self.updateAllApplicants = function(){
        self.appStatus = "processing";

        angular.forEach(self.filesAdded, function(file, key){
            file.status = "Updating";
            applicantService.updateApplicantName(file.id, file.applicantName)
                .then(function(response){
                    file.status = "Updated";
                    self.appStatus = "ready";
                });
        });
        self.appStatus = "ready";
    };
});