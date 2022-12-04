const advancedSearchField = document.querySelectorAll('.advanced-search-field');

advancedSearchField.forEach((field) => {

    const type = field.getAttribute('data-type');

    const chevron = field.querySelector('.chevron');
    const container = field.querySelector('.advanced-search-tags-container');
    const title = field.querySelector('.advanced-search-title');
    const input = field.querySelector('.advanced-search-input');

    chevron.addEventListener('click', toggleField)
    
    function toggleField(){
        title.classList.toggle('field-closed');
        input.classList.toggle('field-closed');
        input.focus();
        container.classList.toggle('field-closed');
        chevron.classList.toggle('field-opened');
    }

});
