  var formwiz = {
    element: '',
    form: [],
    position: 0,
    wrap: '',
    form_tag: '',
    submit_label: 'Submit the Form',
    return_value: '',
    style: {
      indicator: {
        selected: '#AAA',
        height: '5px',
        color: '#FFF',
        border: '#000'
      }
    },
    ajax: {
      url: '',
      type: 'POST',
      async: false,
    },
    /* Start the widget
     * ==================================================================== */
    fw_start: function() {
      pt = this;

      /* Add submit element to form
       * ========================== */
       pt.form[pt.form.length] = {
          id: 'submit',
          type: 'submit',
          value: pt.submit_label
       }
      this.wrap = $('<div>', {
        id: 'fw_wrap'
      });
      var pos_i = $('<div/>');
      pos_i.css({
        'height': pt.style.indicator.height,
        'width': '100%',
        'background-color': '#000',
        'border-bottom': '1px solid '+pt.style.indicator.border
      });
      var pi_width = $('#'+this.element).width() / (this.form.length) -1 ;
      $('#'+this.element).append(pos_i);

      for(i = 0; i <= this.form.length -1; i++) {
        var pi_inc = $('<div/>', {
          id: 'pi-'+i,
          css: {
            'width': pi_width+'px',
            'height': '5px',
            'float': 'left',
            'background-color': pt.style.indicator.color,
            'border-right': '1px solid '+pt.style.indicator.border
          }
        });

        // Kill the last right border.
        if(i == this.form.length) {
          pi_inc.css('border-right', '');
          pi_inc.css('width', pi_inc.width() + 1);
        }
        pos_i.append(pi_inc);
      }
      $('#'+this.element).append(this.wrap);
      this.fw_show(this.position);
    },

    /* Displays the submit element of the widget
     * ==================================================================== */
    show_submit: function() {
      pt = this;
      this.do_submit();
    },
    /* Submit the form
     * ==================================================================== */
    do_submit: function() {
      var data = '';
      for(i = 0; i <= pt.form.length -2; i++) {
        data += pt.form[i].id+'='+pt.form[i].value+'&';
      }
      data = escape(data.substring(0, data.length -1));
      jQuery.ajax({
        url: pt.ajax.url,
        data: data,
        type: pt.ajax.type,
        async: pt.ajax.async,
        success: function(data, stat, jqXHR) {
          pt.return_value = data;
        }
      });
    },

    /* Event for next button. Advances the widget
     * ==================================================================== */
    button_next: function(pos) {
      pt  = this;
      pt.form[pos].value = pt.form_tag.val();
      $(pt.wrap).hide().empty();;
      if(pt.position == pt.form.length -1) {
        pt.show_submit();
      } else {
        pt.position++;
        pt.fw_show(pt.position);
        $(pt.wrap).show();
        $(pt.form_tag).focus();
      }

    },

    /* Generates the form tag and appends to element
     * ===================================================================== */
    fw_show: function(pos) {
      pt = this;
      /* Form Tag Element
       * ================ */
      pt.form_tag = $('<input>', {
        type: this.form[pos].type,
        id: this.form[pos].id,
        value: this.form[pos].value,
        placeholder: this.form[pos].label
      }); // End form tag
      pt.form_tag.css('margin-right', '4px');

      /* Next Button Element
       * =================== */
      var next_btn = $('<button/>', {
        text: '>>',
      });
      next_btn.css('width', '30px');

      /* Assign Event Handlers
       * ===================== */
      next_btn.on('click', function() {
        pt.button_next(pos);
      });
      pt.form_tag.on('keyup', function(e) {
        if(e.keyCode == 13) {
          pt.button_next(pos);
        }
      });

      /* Append form_tag & next_btn
       * ========================== */
      $('#pi-'+pos).css('background-color', pt.style.indicator.selected);
      $(this.wrap).append(pt.form_tag);
      $(pt.form_tag).focus();
      if(pt.form[pos].type != 'submit') {
        $(this.wrap).append(next_btn);
      }
    } // ======= end fw_show
  }   // ======= End of Class
