var expect = chai.expect;
var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};

function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
}

function safe_tags_replace(str) {
    return str.replace(/[&<>]/g, replaceTag);
}


describe('CSV generator', function() {
    'use strict';
    var converted1,converted2,converted3,converted4,converted5,converted6;
    var ourQuiz, form;
    var contestData = {
        question1: 'juan, alberto , maria , "Manolo,s",luz',
        answer1: '<p>\n<table class="center" id="result">\n<tbody><tr>                    <td>juan</td>                                  <td> alberto </td>                                  <td> maria </td>                                  <td>Manolo,s</td>                                  <td>luz</td>              </tr>\n</tbody></table></p>',
        question2: 'juan, alberto , , "Manolo,s",luz',
        answer2: '<p>\n<table class="center" id="result">\n<tbody><tr>                    <td>juan</td>                                  <td> alberto </td>                                  <td> </td>                                  <td>Manolo,s</td>                                  <td>luz</td>              </tr>\n</tbody></table></p>',
        question3: 'juan, alberto , maria ,\n "Manolo,s",luz',
        answer3: '<p>\n<table class="center" id="result">\n<tbody><tr>                    <td>juan</td>                                  <td> alberto </td>                                  <td> maria </td>              </tr>\n<tr class="error">                    <td>Manolo,s</td>                                  <td>luz</td>              </tr>\n</tbody></table></p>',
        
    };

    before(function() {
        //ourQuiz = new Quiz(contestData);
        //form = jQuery('body').append(formMarkup);
    });

    after(function() {
        jQuery('#fixture').remove();
    });

    beforeEach(function() {
        document.getElementById('original').value = contestData.question1;
	calculate();
	converted1 = document.createElement("div");
	converted1.innerHTML = document.getElementById('finaltable').innerHTML;
	//------------
	document.getElementById('original').value = contestData.question2;
	calculate();
	converted2 = document.createElement("div");
	converted2.innerHTML = document.getElementById('finaltable').innerHTML;
	//------------
	document.getElementById('original').value = contestData.question3;
	calculate();
	converted3 = document.createElement("div");
	converted3.innerHTML = document.getElementById('finaltable').innerHTML;
    });
    
    it('Tabla simple sin errores: juan, alberto , maria , "Manolo,s",luz ', function() {
	expect(converted1.innerHTML).to.equal(contestData.answer1);
	document.getElementById('test_output1').innerHTML=safe_tags_replace(contestData.answer1);
    });
    it('Tabla con campos en blancos: juan, alberto , , "Manolo,s",luz', function() {
	expect(converted2.innerHTML).to.equal(contestData.answer2);
	document.getElementById('test_output2').innerHTML=safe_tags_replace(contestData.answer2);
    });
    it('Tabla con exeso de campos: juan, alberto , maria ,\\n "Manolo,s",luz', function() {
	expect(converted3.innerHTML).to.equal(contestData.answer3);
	document.getElementById('test_output3').innerHTML=safe_tags_replace(contestData.answer3);
    });
});


