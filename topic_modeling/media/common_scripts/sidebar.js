/*
 * The Topic Browser
 * Copyright 2010-2011 Brigham Young University
 * 
 * This file is part of the Topic Browser <http://nlp.cs.byu.edu/topic_browser>.
 * 
 * The Topic Browser is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published by the
 * Free Software Foundation, either version 3 of the License, or (at your
 * option) any later version.
 * 
 * The Topic Browser is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public
 * License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with the Topic Browser.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * If you have inquiries regarding any further use of the Topic Browser, please
 * contact the Copyright Licensing Office, Brigham Young University, 3760 HBLL,
 * Provo, UT 84602, (801) 422-9339 or 422-3821, e-mail copyright@byu.edu.
 */

function render_nav_arrows(current_page, num_pages, list_name) {
    var new_html = '<div id="' + list_name + '_list_nav" class="list_nav">';
    
    new_html += '<span id="' + list_name + '_list_nav_back_arrows" class="list_nav_back_arrows">&nbsp;'
    if (current_page != 1) {
        new_html += '<span id="' + list_name + '_list_nav_first_page_arrow" class="link nav_arrow" onclick="get_' + list_name + '_page(1)">'
        new_html += '&lt;&lt;';
        new_html += '</span>';
        new_html += '<span id="' + list_name + '_list_nav_prev_page_arrow" class="link nav_arrow" onclick="get_' + list_name + '_page(';
        new_html += (current_page-1) + ')">';
        new_html += '&lt;';
        new_html += '</span>';
    }
    new_html += '</span>';
    new_html += '<span id="' + list_name + '_list_nav_header" class="centered">';
    new_html += 'Page ';
    new_html += current_page + ' of ' + num_pages;
    new_html += '</span>';
    
    new_html += '<span id="' + list_name + '_list_nav_fwd_arrows" class="list_nav_fwd_arrows">&nbsp;'
    if (current_page != num_pages) {
        new_html += '<span id="' + list_name + '_list_nav_next_page_arrow" class="link nav_arrow" onclick="get_' + list_name + '_page(';
        new_html += (current_page+1)+')">';
        new_html += '&gt;';
        new_html += '</span>';
        new_html += '<span id="' + list_name + '_list_nav_last_page_arrow" class="link nav_arrow" onclick="get_' + list_name + '_page(';
        new_html += num_pages+')">';
        new_html += '&gt;&gt;';
        new_html += '</span>';
    }
    new_html += '</span>';
    
    new_html += '</div>';
    
    return new_html;
}
