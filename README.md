# Form Spinner
Form Spinner displays form elements in a single element one at a time by clicking next to get through each field until you have completed the form. Once you are done, you can submit the form and the ajax calls are fired.

## Supported form elements
* text
* select 
* radio buttons (not complete)
* check boxes (not complete)
* date selector (requires jQuery-UI, not complete)

## Creating the form options
Form elements are created with an array of javascript objects.

### Text Field
```
{
  'id': 'name_of_field',
  'type': 'text',
  'label': 'displayed_as_placeholder'
}
```
### Select Field
```
{
  'id': 'name_of_field',
  'type': 'select',
  'label': 'unused_for_now',
  'options' : {
    'val1': 'display_text',
    'val2': 'display_text'
  }
}
```

### Complete JS option object
```
var options = [
  {
    'id': 'first_name',
    'type': 'text',
    'label': 'First Name'
  },
  {
    'id': 'state',
    'type': 'select',
    'label': 'State',
    'options': {
      'CA': 'California',
      'NV': 'Nevada'
    }
  }

]
```
