/* global describe,  it, expect, doc, helpers, documentEvaluate, win */
'use strict';

describe('Custom "OpenClinica" functions', function() {

    it('valid comment-status() calls', function() {
        var a = {
            "queries": [],
            "logs": [{
                "type": "comment",
                "assigned_to": "Ada Clare (aclare)",
                "date_time": "2016-04-22 14:44:20 -06:00",
                "comment": "This is an older comment.",
                "status": "updated",
                "user": "Maurice Moss (moss)"
            }, {
                "type": "audit",
                "message": "Item data value updated from old_value to new_value.",
                "date_time": "2016-05-18 12:44:20 -06:00",
                "user": "Jen Barber (jen)",
            }]
        };
        var b = {
            "queries": [{
                "type": "comment",
                "assigned_to": "Ada Clare (aclare)",
                "date_time": "2016-04-22 14:44:20 -06:00",
                "comment": "This is an older comment.",
                "status": "updated",
                "user": "Maurice Moss (moss)"
            }, {
                "type": "audit",
                "message": "Item data value updated from old_value to new_value.",
                "date_time": "2016-05-18 12:44:20 -06:00",
                "user": "Jen Barber (jen)",
            }],
            "logs": []
        };

        [
            ['comment-status(.)', '', ''],
            ['comment-status(.)', 'a', ''],
            ['comment-status(.)', {}, ''],
            ['comment-status(.)', {queries:[]}, ''],
            ['comment-status(.)', {logs:[]}, ''],
            ['comment-status(.)', a, 'updated'],
            ['comment-status(.)', b, 'updated'],
            ['comment-status(//*[@id="oc1"])', b, 'updated']
        ].forEach(function(t) {
            var result;
            var el = doc.getElementById('oc1');

            el.textContent = JSON.stringify(t[1]);
            result = documentEvaluate(t[0], el, null, win.XPathResult.STRING_TYPE, null);
            expect(t[2]).to.equal(result.stringValue);
        });
    });

    it('invalid comment-status() calls', function() {
        var test1 = function() {
            documentEvaluate('comment-status(., "2nd argument")', doc.getElementById('oc1'), helpers.xhtmlResolver, win.XPathResult.NUMBER_TYPE, null);
        };
        var test2 = function() {
            documentEvaluate('comment-status()', doc.getElementById('oc1'), helpers.xhtmlResolver, win.XPathResult.NUMBER_TYPE, null);
        };
        expect(test1).to.throw(win.Error);
        expect(test2).to.throw(win.Error);
    });
});
