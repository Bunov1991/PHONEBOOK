$(() => {
    const host = 'https://phonebook-1799a.firebaseio.com/phonebook/';
    const list =  $('#phonebook');
    const personInput = $('#person');
    const phoneInput = $('#phone');
    const errorMsg = $('#error');

    $('#btnLoad').click(loadContacts);
    $('#btnCreate').click(createContact);


    loadContacts()

    function loadContacts(data) {

        list.empty();
        list.html('<li>Loading &hellip;</li>');
        $.ajax({
            url: host + '.json',
            success: loadSuccess
        });
    }
    function loadSuccess(data) {
        list.empty();
        for(let key in data){
            let entry = data[key];
            appendContact(entry,key);
        }
    }
    function appendContact(entry,key) {
        const contact = $(`<li data-id="${key}">${entry.person}: ${entry.phone}</li>`);
        const deleteBtn = $('<button>Delete</button>');
        deleteBtn.click(deleteContact);
        contact.append(deleteBtn);
        list.append(contact);
    }


    function createContact() {
        const person = personInput.val();
        const phone = phoneInput.val();
        if(person.length < 1 || phone.length < 1){
            errorMsg.text('Both Person and Phone are required.');
            return;
        }
        errorMsg.empty();
        $.ajax({
            url: host + '.json',
            method: 'POST',
            data: JSON.stringify({phone,person}),
            success: createSuccess
        });
    }
    function createSuccess() {
        const person = personInput.val();
        const phone = phoneInput.val();
        personInput.val('');
        phoneInput.val('');
        appendContact({person,phone})
    }
    function deleteContact() {
        const item = $(this).parent();
        const key = $(this).parent().attr('data-id');
        console.log(key);
        $.ajax({
            url: host + 'id'  + '.json',
            method: 'DELETE',
            success: deleteSuccess
        });

        function deleteSuccess() {
            item.remove();
        }
    }

});