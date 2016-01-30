/**
 * Created by Mandics on 06/11/2015.
 */
app.service('applicantService', function($http) {

    this.search = function(skills){
        return $http.get('/search?skill='+skills);
    };

    this.upload = function(cv, fileName){
        return $http.post('/upload',{cv:cv, fileName: fileName});
    };

    this.updateApplicantName = function(id, applicantName){
        return $http.put('/updateApplicant',{id:id, applicantName: applicantName});
    };
});