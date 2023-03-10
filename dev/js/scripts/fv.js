const validClass = 'valid';
const invalidClass = 'invalid';
const dataAction = 'data-action';
const dataFeat = 'data-feat';
const dataMaskSelector = '[data-mask-init]';
const datepickerSelector = '[single-datepicker]';
const dataMaskRequiredSelector = '[data-mask-required-init]';
const countryMaskWrapperSelector = '.country-mask';
const AJAXPopupAction = 'open-ajax-popup';
const openInlineAction = 'open-inline-popup';
const inputTextAction = 'required-text';
const inputNumberAction = 'required-number';
const inputEmailAction = 'required-email';
const emailInputControlAction = 'email-input-control';
const inputMaskAction = 'required-mask';
const radiobuttonAction = 'required-radiobutton';
const checkboxAction = 'required-checkbox';
const selectAction = 'required-select';
const countryMaskAction = 'country-mask';
const fileAction = 'input-file';
const fileMultipleAction = 'input-file-multiple';
const fileRequiredAction = 'required-input-file';
const fileMultipleRequiredAction = 'required-input-file-multiple';
const inputPasswordAction = 'input-password';
const numberInset = 'number-inset';
const letterInset = 'letter-inset';
const formSubmit = 'form-submit';

window.addEventListener('load', () => {
  stylerInit('.styler', [selectLoadImages]);

  const inputMaskNodes = document.querySelectorAll(dataMaskSelector);
  if (inputMaskNodes) {
    inputMaskNodes.forEach((item) => {
      inputMaskInit(item);
    });
  }

  const inputMaskRequiredNodes = document.querySelectorAll(dataMaskRequiredSelector);
  if (inputMaskRequiredNodes) {
    inputMaskRequiredNodes.forEach((item) => {
      inputMaskRequiredInit(item);
    });
  }

  const datepeackerNodes = document.querySelectorAll(datepickerSelector);
  if (datepeackerNodes.length) {
    datepeackerNodes.forEach((item) => {
      datePickerInit(item);
    });
  }

  const inputFileMultiples = document.querySelectorAll('input[type="file"][multiple]');
  if (inputFileMultiples.length) {
    inputFileMultiples.forEach((item) => {
      editableInputFileMultipleInit(item);
    });
  }
});

document.addEventListener('click', (e) => {
  const targetNode = e.target.closest(`[${dataAction}]`);
  let dataActionAttr = null;
  let dataHref = null;
  let dataClass = null;

  if (targetNode) {
    dataActionAttr = targetNode.getAttribute(dataAction);
    dataHref = targetNode.getAttribute('data-href');
    dataClass = targetNode.getAttribute('data-class');
  }

  switch (true) {
    case dataActionAttr === AJAXPopupAction:
      e.preventDefault();
      openAJAXPopUp(dataHref, dataClass, [
        popupAJAXStylerInit,
        datepickerAJAXInit,
        inputMaskAJAXInit,
        inputMaskRequiredAJAXInit,
      ]);
      break;

    case dataActionAttr === openInlineAction:
      e.preventDefault();
      openInlinePopup(dataHref);
      break;

    case dataActionAttr === formSubmit:
      const selectors = [
        `[${dataAction}="${inputTextAction}"]`,
        `[${dataAction}="${inputNumberAction}"]`,
        `[${dataAction}="${inputEmailAction}"]`,
        `[${dataAction}="${selectAction}"]`,
        `[${dataAction}="${radiobuttonAction}"]`,
        `[${dataAction}="${checkboxAction}"]`,
        `[${dataAction}="${fileRequiredAction}"]`,
        `[${dataAction}="${fileMultipleRequiredAction}"]`,
        `[${dataAction}="${inputPasswordAction}"]`,
        dataMaskRequiredSelector,
      ];
      const requiredFields = targetNode.closest('form').querySelectorAll(selectors.join(', '));

      if (requiredFields.length) {
        requiredFields.forEach((item) => {
          checkNodeValidity(item);
        });
      }
      break;

    default:
      break;
  }
});

document.addEventListener('input', (e) => {
  const targetNode = e.target;
  const dataActionAttr = targetNode.getAttribute(dataAction);
  const dataFeatAttr = targetNode.getAttribute(dataFeat);

  /*
   * Main action
   */
  switch (true) {
    case dataActionAttr === inputTextAction || dataActionAttr === inputNumberAction:
      checkNodeValidity(targetNode);
      break;

    case dataActionAttr === inputEmailAction:
      checkEmailField(targetNode);
      break;

    case dataActionAttr === emailInputControlAction:
      emailInputControl(targetNode);
      break;

    case dataActionAttr === inputPasswordAction:
      inputPasswordCheckValidity(targetNode);
      break;

    default:
      break;
  }

  /*
   * Feat action
   */
  switch (true) {
    case dataFeatAttr === numberInset:
      targetNode.value = targetNode.value.replace(/[0-9]/g, '');

      break;

    case dataFeatAttr === letterInset:
      targetNode.value = targetNode.value.replace(/[a-zа-яё\s]/g, '');

      break;
  }
});

document.addEventListener('change', (e) => {
  const targetNode = e.target;
  const dataActionAttr = targetNode.getAttribute(dataAction);

  switch (true) {
    case dataActionAttr === radiobuttonAction || dataActionAttr === selectAction:
      checkNodeValidity(targetNode);
      break;

    case dataActionAttr === checkboxAction:
      updateGroupCheckboxesValidity(targetNode);
      break;

    case dataActionAttr === countryMaskAction:
      updateCountryMask(targetNode);
      break;

    case dataActionAttr === fileAction:
      inputFileHandler(targetNode);
      break;

    case dataActionAttr === fileRequiredAction:
      inputFileRequiredHadler(targetNode);
      break;

    case dataActionAttr === fileMultipleAction:
      inputFileMultipleHandler(targetNode);
      break;

    case dataActionAttr === fileMultipleRequiredAction:
      inputFileMultipleRequiredHandler(targetNode);
      break;

    default:
      break;
  }
});

const stylerInit = (selector, callbacks = []) => {
  const stylerNodes = document.querySelectorAll(selector);

  if (stylerNodes.length) {
    stylerNodes.forEach((item) => {
      $(item).styler({
        onFormStyled: function () {
          const eTarget = this[0];

          if (callbacks.length) {
            callbacks.map((callback) => callback(eTarget));
          }
        },
        onSelectClosed: function () {
          this[0].querySelector('select').dispatchEvent(new Event('change', { bubbles: true }));
        },
      });
    });
  }
};

const popupAJAXStylerInit = () => {
  stylerInit('.mfp-content .styler', [selectLoadImages]);
};

const datepickerAJAXInit = () => {
  const singleDatepickers = document.querySelectorAll(`.mfp-content ${datepickerSelector}`);
  if (singleDatepickers.length) {
    singleDatepickers.forEach((item) => {
      const minDate = minDate ? new Date(item.dataset.minDate) : getRelativeDate('-1_0_0');
      const maxDate = maxDate ? new Date(item.dataset.maxDate) : getRelativeDate('+1_0_0');

      singleDatepickerInit({ node: item, minDate: minDate, maxDate: maxDate });
    });
  }
};

const openAJAXPopUp = (dataHref, dataClass, callbacks = []) => {
  $.magnificPopup.open({
    items: {
      src: dataHref,
    },
    type: 'ajax',
    mainClass: `mfp-fade ${dataClass}`,
    removalDelay: 300,
    closeOnBgClick: true,
    callbacks: {
      beforeOpen: scrollDisable,
      ajaxContentAdded: () => {
        if (callbacks.length) {
          callbacks.map((callback) => {
            callback();
          });
        }
      },
      afterClose: scrollEnable,
    },
  });
};

const inputMaskInit = (node) => {
  const nodeMask = node.getAttribute('data-mask');
  const nodePlaceholder = node.getAttribute('data-placeholder');

  const config = {
    clearMaskOnLostFocus: true,
    clearIncomplete: true,
    oncleared: function () {
      this.dispatchEvent(new Event('input', { bubbles: true }));
    },
    onincomplete: function () {
      this.dispatchEvent(new Event('input', { bubbles: true }));
    },
    onKeyValidation: function () {
      this.dispatchEvent(new Event('input', { bubbles: true }));
    },
  };

  if (nodePlaceholder) {
    config['placeholder'] = nodePlaceholder;
  }

  Inputmask(nodeMask, config).mask(node);
};

const inputMaskAJAXInit = () => {
  const nodes = document.querySelectorAll(`.mfp-content ${dataMaskSelector}`);
  if (nodes.length) {
    nodes.forEach((node) => {
      inputMaskInit(node);
    });
  }
};

const inputMaskRequiredInit = (node) => {
  const nodeMask = node.getAttribute('data-mask');
  const nodePlaceholder = node.getAttribute('data-placeholder');

  const config = {
    clearMaskOnLostFocus: true,
    clearIncomplete: true,
    oncomplete: function () {
      node.setCustomValidity('');
      checkNodeValidity(node);
    },
    oncleared: function () {
      node.setCustomValidity('Invalid field');
      checkNodeValidity(node);
    },
    onincomplete: function () {
      node.setCustomValidity('Invalid field');
      checkNodeValidity(node);
      this.dispatchEvent(new Event('input', { bubbles: true }));
    },
    onKeyValidation: function () {
      this.dispatchEvent(new Event('input', { bubbles: true }));
    },
  };

  if (nodePlaceholder) {
    config['placeholder'] = nodePlaceholder;
  }

  Inputmask(nodeMask, config).mask(node);
};

const inputMaskRequiredAJAXInit = () => {
  const nodes = document.querySelectorAll(`.mfp-content ${dataMaskRequiredSelector}`);
  if (nodes.length) {
    nodes.forEach((node) => {
      inputMaskRequiredInit(node);
    });
  }
};

const openInlinePopup = (dataHref) => {
  $.magnificPopup.open({
    items: {
      src: dataHref,
    },
    type: 'inline',
    closeOnBgClick: true,
  });
};

const wrapperSetValid = (wrapper) => {
  wrapper.classList.add(validClass);
  wrapper.classList.remove(invalidClass);
};

const wrapperSetInvalid = (wrapper) => {
  wrapper.classList.add(invalidClass);
  wrapper.classList.remove(validClass);
};

const checkNodeValidity = (node) => {
  const wrapper = node.closest(WRAPPER_SELECTOR);

  node.validity.valid && readOnlyNodeValidate(node)
    ? wrapperSetValid(wrapper)
    : wrapperSetInvalid(wrapper);
};

const readOnlyNodeValidate = (node) => {
  if (node.readOnly) {
    return node.value !== '';
  }

  return true;
};

const removeFieldValidity = (node) => {
  const wrapper = node.closest(WRAPPER_SELECTOR);

  node.required = false;
  node.setCustomValidity('');
  wrapper.classList.remove(validClass);
  wrapper.classList.remove(invalidClass);
};

const resetFieldValidity = (node) => {
  const wrapper = node.closest(WRAPPER_SELECTOR);

  node.setCustomValidity('');
  wrapper.classList.remove(validClass);
  wrapper.classList.remove(invalidClass);
};

const checkEmailField = (node) => {
  const nodeValue = node.value;

  nodeValue.length > 0 &&
  (nodeValue.match(/[a-z0-9]\@.+[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}/g) || []).length !== 1
    ? node.setCustomValidity('Заполните это поле')
    : node.setCustomValidity('');

  checkNodeValidity(node);
};

const emailInputControl = (node) => {
  const nodeValue = node.value;

  if (
    nodeValue.length > 0 &&
    (nodeValue.match(/[a-z0-9]\@.+[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}/g) || []).length !== 1
  ) {
    node.setCustomValidity('Заполните это поле');
    node.required = true;
    checkNodeValidity(node);
  } else if (nodeValue === '') {
    removeFieldValidity(node);
  } else {
    node.setCustomValidity('');
    node.required = false;
    checkNodeValidity(node);
  }
};

const selectLoadImages = (select) => {
  if (select.getAttribute(dataAction) === countryMaskAction) {
    const selectOptions = select.querySelectorAll('option');
    const inputCountryWrapper = select.closest(countryMaskWrapperSelector);
    const inputVisible = inputCountryWrapper.querySelector('input[type="tel"][data-mask]');
    const inputResult = inputCountryWrapper.querySelector('[data-result-value]');

    if (selectOptions.length) {
      selectOptions.forEach((option, index) => {
        if (!option.classList.contains('no-mask')) {
          const styleredSelectOptions = inputCountryWrapper.querySelectorAll(
            '.jq-selectbox__dropdown li'
          );
          const styleredSelectOptionsItem = styleredSelectOptions[index];

          if (styleredSelectOptionsItem) {
            styleredSelectOptionsItem.style.backgroundImage = `url("${option.getAttribute(
              'data-img'
            )}")`;
            const selectedCountry = inputCountryWrapper.querySelector('.selected.sel');
            if (selectedCountry) {
              inputCountryWrapper.querySelector(
                '.jq-selectbox__select-text'
              ).style.backgroundImage = selectedCountry.style.backgroundImage;
            }
          }
        }
      });
    }

    inputVisible.addEventListener('input', () => {
      inputResult.value = inputVisible.value;
    });
  }
};

const updateCountryMask = (select) => {
  const countryWrapper = select.closest(countryMaskWrapperSelector);
  const result = countryWrapper.querySelector('[data-result-value]');
  const input = countryWrapper.querySelector('input[data-mask]');
  const selectedOption = select.options[select.selectedIndex];
  const selectPlaceholder = selectedOption.getAttribute('data-placeholder');
  const selectedImg = selectedOption.getAttribute('data-img');
  const selectedDataValue = select.value;

  if (input.inputmask) {
    input.inputmask.remove();
  }

  input.value = '';
  resetFieldValidity(input);

  if (selectedOption.classList.contains('no-mask')) {
    countryWrapper.querySelector('.jq-selectbox__select-text').style.backgroundImage = 'none';
    input.setAttribute('placeholder', '_______');
    input.setAttribute('data-mask', '');
    input.setAttribute('data-placeholder', '');
    result.value = input.value;
  } else {
    countryWrapper.querySelector(
      '.jq-selectbox__select-text'
    ).style.backgroundImage = `url("${selectedImg}")`;
    input.setAttribute('placeholder', selectPlaceholder);
    input.setAttribute('data-mask', selectedDataValue);
    input.setAttribute('data-placeholder', selectPlaceholder);

    input.required ? inputMaskRequiredInit(input) : inputMaskInit(input);

    result.value = `${select.value} ${input.value}`;
  }
};

const updateGroupCheckboxesValidity = (node) => {
  const wrapper = node.closest(WRAPPER_SELECTOR);
  const checkboxes = wrapper.querySelectorAll('input[type="checkbox"]');
  const checkboxChecked = wrapper.querySelector('input[type="checkbox"]:checked');
  const checkboxNotChecked = wrapper.querySelectorAll('input[type="checkbox"]:not(:checked)');

  if (checkboxChecked) {
    checkboxNotChecked.forEach((item) => {
      item.required = false;
    });

    checkNodeValidity(checkboxChecked);
  } else {
    checkboxes.forEach((item) => {
      item.required = true;
    });

    checkNodeValidity(node);
  }
};

const inputFileHandler = (node) => {
  const files = node.files;
  const maxSize = parseInt(node.getAttribute('data-max-size'));
  const previewNode = node.closest(WRAPPER_SELECTOR).querySelector('.form-file');
  const previewNodeData = previewNode.querySelector('.form-file__preview');

  if (files.length) {
    const file = files[0];
    const src = URL.createObjectURL(file);
    const name = file.name;
    const size = file.size / 1000;

    previewNode.querySelector('[data-file-img]').src = src;
    previewNode.querySelector('[data-file-name]').textContent = name;
    previewNode.querySelector('[data-file-size]').textContent = `${size}кб`;
    previewNodeData.classList.remove(HIDDEN_CLASS);

    if (size > maxSize) {
      node.setCustomValidity(`Размер файла больше ${maxSize} кб`);
      previewNode.classList.add(invalidClass);
    } else {
      node.setCustomValidity('');
      previewNode.classList.remove(invalidClass);
    }
  } else {
    node.setCustomValidity('');
    previewNodeData.classList.add(HIDDEN_CLASS);
    previewNode.classList.remove(invalidClass);
  }
};

const inputFileRequiredHadler = (node) => {
  inputFileHandler(node);
  checkNodeValidity(node);
};

const inputFileMultipleHandler = (node) => {
  const files = node.files;
  const fileListContainer = node.closest(WRAPPER_SELECTOR).querySelector('[data-file-list]');

  fileListContainer.innerHTML = '';

  for (let index = 0; index < files.length; index++) {
    const li = document.createElement('li');

    li.classList.add('input-file__list-item');
    li.setAttribute('data-last-modified', files[index].lastModified);
    li.setAttribute('data-size', files[index].size);

    const nameItemNode = document.createElement('span');

    nameItemNode.classList.add('input-file__list-name');
    nameItemNode.textContent = files[index].name;

    const sizeItemNode = document.createElement('span');

    sizeItemNode.classList.add('input-file__list-size');
    sizeItemNode.textContent = `${files[index].size / 1024} кб`;

    const removeItemNode = document.createElement('span');

    removeItemNode.classList.add('input-file__list-cross');
    removeItemNode.classList.add('cross-style');
    removeItemNode.addEventListener('click', removeFileListItem);

    li.append(nameItemNode);
    li.append(sizeItemNode);
    li.append(removeItemNode);

    fileListContainer.append(li);
  }

  if (node.dataset.totalSize || node.dataset.filesCount) {
    inputFileMultipleCheckValidity(node);
  }
};

const inputFileMultipleRequiredHandler = (node) => {
  inputFileMultipleHandler(node);
  // inputFileMultipleCheckValidity(node);
};

const inputFileMultipleCheckValidity = (node) => {
  const maxTotalSize = node.dataset.totalSize * 1024;
  const files = node.files;
  const filesSizes = Array.from(files).map((item) => item.size / 1024);
  const dataFilesCount = parseInt(node.dataset.filesCount);
  const totalSize = filesSizes.reduce((prev, curr) => prev + curr);

  files.length && files.length <= dataFilesCount && totalSize <= maxTotalSize
    ? node.setCustomValidity('')
    : node.setCustomValidity('Invalid field');

  checkNodeValidity(node);
};

const removeFileListItem = (e) => {
  const eTarget = e.target;
  const fileNode = eTarget.closest('li');
  const inputFile = eTarget.closest(WRAPPER_SELECTOR).querySelector('input[type="file"]');
  const fileList = [...inputFile.files];

  const fileLastModified = parseInt(fileNode.getAttribute('data-last-modified'));
  const fileSize = parseInt(fileNode.getAttribute('data-size'));
  const fileName = fileNode.textContent;

  const newFileList = fileList.filter((item) => {
    const { lastModified, name, size } = item;

    if (lastModified === fileLastModified || name === fileSize || size === fileName) {
      return false;
    } else {
      return true;
    }
  });

  inputFile.files = new FileListItems(newFileList);
  eTarget.dispatchEvent(new Event('change', { bubbles: true }));

  eTarget.removeEventListener('click', removeFileListItem);
  eTarget.closest('li').remove();

  if (inputFile.dataset.totalSize || inputFile.dataset.filesCount || inputFile.required) {
    inputFileMultipleCheckValidity(inputFile);
  }
};

const FileListItems = (files) => {
  const b = new ClipboardEvent('').clipboardData || new DataTransfer();

  for (let i = 0, len = files.length; i < len; i++) {
    b.items.add(files[i]);
  }

  return b.files;
};

const editableInputFileMultipleInit = (node) => {
  let userfileListArray = [...node.files];

  node.addEventListener('click', (e) => {
    userfileListArray = [...e.target.files];
  });

  node.addEventListener('change', (e) => {
    const newFileListArray = [...e.target.files];

    if (userfileListArray.length) {
      newFileListArray.forEach((item) => {
        const { lastModified, name, size } = item;

        const duplicatefileListArray = userfileListArray.filter((itemFL) => {
          if (
            lastModified === itemFL.lastModified ||
            name === itemFL.name ||
            size === itemFL.size
          ) {
            return true;
          } else {
            return false;
          }
        });

        if (!duplicatefileListArray.length) {
          userfileListArray.push(item);
        }
      });
    } else {
      userfileListArray = [...newFileListArray];
    }

    node.files = new FileListItems(userfileListArray);
  });
};
