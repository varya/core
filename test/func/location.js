'use strict';

module.exports = {
    '@tags': ['location'],

    'activates slide on page load by number in `list` mode': browser => {
        browser.url(`${browser.launchUrl}/list-id#3`);
        browser.assert.cssClassPresent('[id="3"]', 'active');
        browser.end();
    },

    'activates slide on page load by number in `full` mode': browser => {
        browser.url(`${browser.launchUrl}/full-id#3`);
        browser.assert.cssClassPresent('[id="3"]', 'active');
        browser.end();
    },

    'activates slide on page load by id in `list` mode': browser => {
        browser.url(`${browser.launchUrl}/list-id#id`);
        browser.assert.cssClassPresent('#id', 'active');
        browser.end();
    },

    'activates slide on page load by id in `full` mode': browser => {
        browser.url(`${browser.launchUrl}/full-id#id`);
        browser.assert.cssClassPresent('#id', 'active');
        browser.end();
    },

    'activates first slide if hash is invalid in `list` mode': browser => {
        browser.url(`${browser.launchUrl}/list-id#invalid`);
        browser.assert.urlContains('#1');
        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.end();
    },

    'activates first slide if hash is invalid in `full` mode': browser => {
        browser.url(`${browser.launchUrl}/full-id#invalid`);
        browser.assert.urlContains('#1');
        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.end();
    },

    'does not activate first slide if hash is missing in `list` mode': browser => {
        browser.url(`${browser.launchUrl}/list-id`);
        browser.assert.cssClassNotPresent('[id="1"]', 'active');
        browser.end();
    },

    'activates first slide if hash is missing in `full` mode': browser => {
        browser.url(`${browser.launchUrl}/full-id`);
        browser.assert.urlContains('#1');
        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.end();
    },

    'updates hash when moving forwards': browser => {
        browser.url(`${browser.launchUrl}/list-id#1`);
        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.assert.urlContains('#id');
        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.assert.urlContains('#3');
        browser.end();
    },

    'updates hash when moving backwards': browser => {
        browser.url(`${browser.launchUrl}/full-id#3`);
        browser.sendKeys('.send-keys', browser.Keys.ARROW_LEFT);
        browser.assert.urlContains('#id');
        browser.sendKeys('.send-keys', browser.Keys.ARROW_LEFT);
        browser.assert.urlContains('#1');
        browser.end();
    },

    'updates slides when changing url': browser => {
        browser.url(`${browser.launchUrl}/list-id#1`);
        browser.assert.cssClassPresent('[id="1"]', 'active');

        browser.execute(function() {
            location.hash = '3';
        });

        browser.assert.cssClassPresent('[id="1"]', 'visited');
        browser.assert.cssClassPresent('[id="3"]', 'active');

        browser.execute(function() {
            location.hash = 'id';
        });

        browser.assert.cssClassPresent('[id="3"]', 'visited');
        browser.assert.cssClassPresent('#id', 'active');
        browser.end();
    },

    'updates slides when navigating through history': browser => {
        browser.url(`${browser.launchUrl}/full-id#1`);
        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);

        browser.back();
        browser.assert.urlContains('#id');
        browser.assert.cssClassPresent('#id', 'active');
        browser.assert.cssClassNotPresent('[id="3"]', 'active');

        browser.back();
        browser.assert.urlContains('#1');
        browser.assert.cssClassPresent('[id="1"]', 'active');
        browser.assert.cssClassNotPresent('#id', 'active');

        browser.forward();
        browser.assert.urlContains('#id');
        browser.assert.cssClassPresent('#id', 'active');
        browser.assert.cssClassNotPresent('[id="1"]', 'active');

        browser.forward();
        browser.assert.urlContains('#3');
        browser.assert.cssClassPresent('[id="3"]', 'active');
        browser.assert.cssClassNotPresent('#id', 'active');

        browser.end();
    },

    'exits `full` mode when navigating through history': browser => {
        browser.url(`${browser.launchUrl}/list-id`);
        browser.click('[id="1"]');
        browser.assert.cssClassPresent('.shower', 'full');

        browser.back();
        browser.assert.cssClassPresent('.shower', 'list');
    },

    'enters `full` mode when navigating through history': browser => {
        browser.url(`${browser.launchUrl}/full`);
        browser.sendKeys('.send-keys', browser.Keys.ARROW_RIGHT);
        browser.sendKeys('.send-keys', browser.Keys.ESCAPE);
        browser.assert.cssClassPresent('.shower', 'list');

        browser.back();
        browser.assert.cssClassPresent('.shower', 'full');
    },

    'does not change slide if hash is invalid in `list` mode': browser => {
        browser.url(`${browser.launchUrl}/list-id#id`);
        browser.execute(function() {
            location.hash = 'invalid';
        });

        browser.assert.cssClassPresent('#id', 'active');
        browser.assert.cssClassNotPresent('#id', 'visited');
        browser.end();
    },

    'does not change slide if hash is invalid in `full` mode': browser => {
        browser.url(`${browser.launchUrl}/full-id#id`);
        browser.execute(function() {
            location.hash = 'invalid';
        });

        browser.assert.cssClassPresent('#id', 'active');
        browser.assert.cssClassNotPresent('#id', 'visited');
        browser.end();
    },

    'sets `full` query on page load (no hash)': browser => {
        browser.url(`${browser.launchUrl}/full`);
        browser.assert.urlContains('?full');
        browser.end();
    },

    'sets `full` query on page load (valid hash)': browser => {
        browser.url(`${browser.launchUrl}/full-id#id`);
        browser.assert.urlContains('?full');
        browser.end();
    },

    'sets `full` query on page load (invalid hash)': browser => {
        browser.url(`${browser.launchUrl}/full-id#invalid`);
        browser.assert.urlContains('?full');
        browser.end();
    },

    'persists `full` query after refresh': browser => {
        browser.url(`${browser.launchUrl}/list`);
        browser.click('[id="3"]');
        browser.refresh();
        browser.assert.cssClassPresent('.shower', 'full');
        browser.end();
    },

    'persists hash after refresh in `list` mode': browser => {
        browser.url(`${browser.launchUrl}/list#3`);
        browser.refresh();
        browser.assert.urlContains('#3');
        browser.end();
    },

    'persists hash after refresh in `full` mode': browser => {
        browser.url(`${browser.launchUrl}/full#3`);
        browser.refresh();
        browser.assert.urlContains('#3');
        browser.end();
    },
};
