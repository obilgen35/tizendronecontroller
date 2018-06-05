/*
 *      Copyright (c) 2015 Samsung Electronics Co., Ltd
 *
 *      Licensed under the Flora License, Version 1.1 (the "License");
 *      you may not use this file except in compliance with the License.
 *      You may obtain a copy of the License at
 *
 *              http://floralicense.org/license/
 *
 *      Unless required by applicable law or agreed to in writing, software
 *      distributed under the License is distributed on an "AS IS" BASIS,
 *      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *      See the License for the specific language governing permissions and
 *      limitations under the License.
 */
 
/*global define, document, tau, window */
 
/**
 * Volume view module.
 *
 * @module views/volume
 * @requires {@link core/event}
 * @requires {@link helpers/dom}
 * @namespace views/volume
 */
define({
    name: 'views/volume',
    requires: [
        'core/event',
        'helpers/dom'
    ],
    def: function volumeDefine(req) {
        'use strict';
 
        /**
         * Core events module.
         *
         * @memberof views/volume
         * @private
         * @type {Module}
         */
        var e = req.core.event,
 
            /**
             * DOM helper module.
             *
             * @memberof views/volume
             * @private
             * @type {Module}
             */
            domHelper = req.helpers.dom,
 
            /**
             * Page element.
             *
             * @memberof views/volume
             * @private
             * @type {HTMLElement}
             */
            page = null,
 
            /**
             * Sections references list.
             *
             * @memberof views/volume
             * @private
             * @type {HTMLElement[]}
             */
            sections = null,
 
            /**
             * Section changer element.
             *
             * @memberof views/volume
             * @private
             * @type {HTMLElement}
             */
            sectionChangerElement = null,
 
            /**
             * Section changer component reference.
             *
             * @memberof views/volume
             * @private
             * @type {object}
             */
            sectionChangerComponent = null,
 
            /**
             * Page indicator element.
             *
             * @memberof views/volume
             * @private
             * @type {HTMLElement}
             */
            pageIndicatorElement = null,
 
            /**
             * Page indicator component.
             *
             * @memberof views/volume
             * @private
             * @type {object}
             */
            pageIndicatorComponent = null,
 
            /**
             * Volume slider element.
             *
             * @memberof views/volume
             * @private
             * @type {HTMLElement}
             */
            volumeSliderElement = null,
 
            /**
             * Volume slider component.
             *
             * @memberof views/volume
             * @private
             * @type {object}
             */
            volumeSliderComponent = null,
 
            /**
             * Current values of each volume type.
             *
             * @memberof views/volume
             * @private
             * @type {object<string, number>}
             */
            volumeValues = {
                'ringtone': 5,
                'multimedia': 4,
                'notification': 3,
                'system': 0
            };
 
        /**
         * Changes value of specified volume type.
         *
         * @memberof views/volume
         * @private
         * @param {string} type
         * @param {number} value
         * @fires "change"
         */
        function changeVolume(type, value) {
            if (!volumeValues.hasOwnProperty(type)) {
                return;
            }
 
            if (value < 0 || value > 9 || volumeValues[type] === value) {
                return;
            }
 
            volumeValues[type] = value;
            e.fire('change');
        }
 
        /**
         * Changes value of specified volume type by specified relative value.
         *
         * @memberof views/volume
         * @private
         * @param {string} type
         * @param {number} change
         */
        function changeVolumeRelative(type, change) {
            if (!volumeValues.hasOwnProperty(type)) {
                return;
            }
 
            changeVolume(type, volumeValues[type] + change);
        }
 
        /**
         * Updates specified volume section UI.
         *
         * @memberof views/volume
         * @private
         * @param {string} type
         */
        function updateSectionUI(type) {
            var value = volumeValues[type],
                activeSectionIndex = sectionChangerComponent
                    .getActiveSectionIndex(),
                section = page.querySelector(
                    'section[data-volume-type="' + type + '"]'
                ),
                iconElement = section.querySelector('.volume-icon');
 
            section.querySelector('.volume-value').innerText = value;
 
            if (section === sections[activeSectionIndex]) {
                // component uses -1 value as 0
                volumeSliderComponent.value(value === 0 ? -1 : value);
            }
 
            if (value === 0) {
                iconElement.classList.add('mute');
            } else {
                iconElement.classList.remove('mute');
            }
        }
 
        /**
         * Updates UI using current volume values.
         *
         * @memberof views/volume
         * @private
         */
        function updateUI() {
            var type = '';
 
            for (type in volumeValues) {
                if (volumeValues.hasOwnProperty(type)) {
                    updateSectionUI(type);
                }
            }
        }
 
        /**
         * Handles "progresschange" event of slider component.
         *
         * @memberof views/volume
         * @private
         */
        function onSliderValueChange() {
            var value = window.parseInt(volumeSliderComponent.value()),
                section = sections[
                    sectionChangerComponent.getActiveSectionIndex()],
                type = section.getAttribute('data-volume-type');
 
            // component uses negative value as 0
            value = value < 0 ? 0 : value;
 
            changeVolume(type, value);
        }
 
        /**
         * Handles "pagebeforeshow" event.
         *
         * @memberof views/volume
         * @private
         */
        function onPageBeforeShow() {
            pageIndicatorComponent =  tau.widget.PageIndicator(
                pageIndicatorElement,
                {numberOfPages: sections.length}
            );
            pageIndicatorComponent.setActive(0);
 
            sectionChangerComponent = new tau.widget.SectionChanger(
                sectionChangerElement, {
                    circular: true,
                    orientation: 'horizontal',
                    useBouncingEffect: true
                }
            );
 
            volumeSliderComponent = tau.widget.Slider(volumeSliderElement);
 
            volumeSliderComponent.on('progresschange', onSliderValueChange);
 
            updateUI();
        }
 
        /**
         * Handles "sectionchange" event.
         *
         * @memberof views/volume
         * @private
         * @param {Event} ev
         */
        function onSectionChange(ev) {
            volumeSliderElement.nextSibling.classList.remove('hidden');
 
            if (!pageIndicatorComponent) {
                return;
            }
            pageIndicatorComponent.setActive(ev.detail.active);
 
            updateUI();
        }
 
        /**
         * Handles "pagehide" event.
         *
         * @memberof views/volume
         * @private
         */
        function onPageHide() {
            sectionChangerComponent.destroy();
            pageIndicatorComponent.destroy();
        }
 
        /**
         * Handles "scrollstart" event on section changer.
         *
         * @memberof views/volume
         * @private
         */
        function onSectionScrollStart() {
            volumeSliderElement.nextSibling.classList.add('hidden');
        }
 
        /**
         * Handles "scrollend" event on section changer.
         *
         * @memberof views/volume
         * @private
         */
        function onSectionScrollEnd() {
            volumeSliderElement.nextSibling.classList.remove('hidden');
        }
 
        /**
         * Handles click on volume buttons.
         *
         * @memberof views/volume
         * @private
         * @param {Event} ev
         */
        function onVolumeBtnClick(ev) {
            var btn = ev.target,
                section = domHelper.closest(btn, 'section'),
                btnAction = btn.getAttribute('data-action'),
                volumeType = '';
 
            if (!section) {
                return;
            }
 
            volumeType = section.getAttribute('data-volume-type');
 
            if (btnAction === 'minus') {
                changeVolumeRelative(volumeType, -1);
            } else if (btnAction === 'plus') {
                changeVolumeRelative(volumeType, 1);
            }
        }
 
        /**
         * Handles "views.volume.change" event.
         *
         * @memberof views/volume
         * @private
         */
        function onVolumeChange() {
            updateUI();
        }
 
        /**
         * Registers module's event listeners.
         *
         * @memberof views/volume
         * @private
         */
        function bindEvents() {
            var i = 0,
                length = 0,
                buttons = null;
 
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
            page.addEventListener('pagehide', onPageHide);
            sectionChangerElement.addEventListener(
                'sectionchange', onSectionChange, false);
            sectionChangerElement.addEventListener('scrollstart',
                onSectionScrollStart);
            sectionChangerElement.addEventListener('scrollend',
                onSectionScrollEnd);
 
            buttons = page.querySelectorAll('.volume-btn');
            length = buttons.length;
 
            for (i = 0; i < length; i += 1) {
                buttons[i].addEventListener('click', onVolumeBtnClick);
            }
 
            e.listeners({
                'views.volume.change': onVolumeChange
            });
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/volume
         * @public
         */
        function init() {
            page = document.getElementById('volume');
            sections = page.querySelectorAll('section');
            pageIndicatorElement = page.querySelector('#volume-page-indicator');
            sectionChangerElement = page
                .querySelector('#volume-section-changer');
            volumeSliderElement = page.querySelector('#volume-slider');
 
            bindEvents();
        }
 
        return {
            init: init
        };
    }
});