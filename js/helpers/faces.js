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
 
/*global define*/
 
/**
 * Faces helper module.
 * Provides utility functions for clock faces.
 *
 * @module helpers/faces
 * @namespace helpers/faces
 */
define({
    name: 'helpers/faces',
    requires: [],
    def: function facesDefine() {
        'use strict';
 
        /**
         * Draws clock face using specified configuration.
         *
         * @memberof helpers/faces
         * @public
         * @param {CanvasRenderingContext2D} ctx
         * @param {object} config
         */
        function drawFace(ctx, config) {
            var size = config.size,
                angle = config.angle || (2 * Math.PI / size),
                lengths = config.lengths || [5],
                length = 0,
                lineWidths = config.lineWidths || [1],
                lineWidth = 0,
                colors = config.colors || ['#fff'],
                color = '',
                i = 0,
                width = ctx.canvas.width;
 
            // clear entire canvas
            ctx.canvas.width = width;
 
            ctx.translate(width / 2, width / 2);
            ctx.rotate(-Math.PI / 2);
 
            for (i = 0; i < size; i += 1) {
                length = lengths[i % lengths.length];
                color =  colors[i % colors.length];
                lineWidth = lineWidths[i % lineWidths.length];
 
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.lineWidth = lineWidth;
                ctx.moveTo(width / 2 - length, 0);
                ctx.lineTo(width / 2, 0);
                ctx.stroke();
 
                ctx.rotate(angle);
            }
        }
 
        return {
            drawFace: drawFace
        };
    }
});