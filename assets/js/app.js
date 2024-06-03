const formOnline = document.querySelector('#formonline');
function getElementByXpath(targetText, targetTagName, el) {
  const xpath = `//${targetTagName}[text()="${targetText}"]`;
  return el.evaluate(
    xpath,
    el,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue.parentElement.parentElement;
}

function post(path, params, method = "post") {
  const form = document.createElement("form");
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement("input");
      hiddenField.type = "hidden";
      hiddenField.name = params[key];
      hiddenField.value = 5;

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  
  form.submit();
}

const btnCheck = document.querySelector(".btn-diemdanh");
btnCheck.addEventListener("click", async function () {
  const koPhep = document.querySelector('#idlistno');
  const coPhep = document.querySelector('#idlistyes');
  const url = document.querySelector('#url');
  const koPhepList = koPhep.value.split('\n').filter(elm => elm);
  const coPhepList = coPhep.value.split('\n').filter(elm => elm);


  const response = await fetch(url.value);
  const result = await response.text();
  
  const page = new DOMParser().parseFromString(result, 'text/html');
  
  let arrVangName = [];
  if (koPhepList.length > 0) {        
    koPhepList.forEach(element => {
      const inputName = getElementByXpath(element, "span", page).querySelector('td:nth-child(9) input').name;
      arrVangName.push(inputName);
    });
  }
  
  if (coPhepList.length > 0) {
    coPhepList.forEach(element => {
      const inputName = getElementByXpath(element, "span", page).querySelector('td:nth-child(8) input').name;
      arrVangName.push(inputName);
    });
  }

  formOnline.innerHTML = new XMLSerializer().serializeToString(page);

  arrVangName.forEach(element => {
    formOnline.querySelector(`input[name='${element}']`).value = '5';
  });
  
  formOnline.querySelector('form').setAttribute('action', url.value);
  
});