function submitPoll() {
    document.getElementById("send_form").disabled = true;
	document.getElementById('send_form').style.opacity='0.3';
	document.getElementById("send_form").value='Зачекайте...';
    setTimeout(function() {
        document.getElementById("send_form").disabled = false;
		document.getElementById('send_form').style.opacity='1';
		document.getElementById("send_form").value='Відправити';
    }, 2000);
}

function submitTrue(){
	document.getElementById("send_form").disabled = true;
	document.getElementById('send_form').style.opacity='0.3';
	document.getElementById("send_form").value='Відправляємо...';
}


function persist(event) {
  localStorage.setItem(event.target.id, event.target.value);
}

document.querySelectorAll("textarea").forEach((inputEl) => {
  inputEl.value = localStorage.getItem(inputEl.id);
  inputEl.addEventListener("change", persist);
});

$('#file-upload').change(function() {
    var i = $(this).prev('label').clone();
    var file = $('#file-upload')[0].files[0].name;
    $(this).prev('label').text(file);
});

document.getElementById('uploadForm').action = 'https://script.google.com/macros/s/AKfycbzHOy_edcvuY90_IKfyiRjB8qs5Hq6Dmp_8ZwaoMU-aRSfHflM/exec';

function validateEmail(email) {
    var re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return re.test(email);
}

function UploadFile() {
    var reader = new FileReader();
    var file = document.getElementById('file-upload').files[0];
    if (file) {
        if (file.size / 1024 / 1024 > 4) {
            alert('Файл важить більше 4 мегабайт. Будь-ласка, оберіть інший файл');
            return false;
        }
        reader.onload = function() {
            document.getElementById('fileContent').value = reader.result;
            document.getElementById('filename').value = file.name;
            submitForm();
        }
        reader.readAsDataURL(file);
        return;
    } else {
        submitForm();
    }
}

function submitForm() {
    var form = document.getElementById('uploadForm');
    if (validateEmail(form.elements.email.value) == false) {
        alert('Перевірте правильність введення пошти!');
		submitPoll();
        return;
    }
    for (var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].value === '' && form.elements[i].hasAttribute('required') || ((form.cups[0].checked == false) && (form.cups[1].checked == false) &&
                (form.cups[2].checked == false) && (form.cups[3].checked == false) && (form.cups[4].checked == false)) || ((form.category[0].checked == false) && (form.category[1].checked == false) && (form.category[2].checked == false)) ||
            form.agree1.checked == false || form.agree2.checked == false) {
            alert('Перевірте, чи усі дані заповнені!');
			submitPoll();
            return false;
        }
    }
	submitTrue();
    form.submit();
};