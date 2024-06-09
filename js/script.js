// Находим нужные элементы
const tableBody = document.querySelector('#tableSum tbody');
const form = document.querySelector('.main__form form');
const serviceSelect = document.getElementById('services');
const quantityInput = document.getElementById('count');
const priceInput = document.getElementById('price');
const addRowBtn = form.querySelector('button[type="submit"]');

// Добавляем обработчик события на форму
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Предотвращаем стандартное поведение формы

  // Создаем новую строку
  const newRow = document.createElement('tr');
  newRow.classList.add('row');

  // Создаем ячейки для новой строки
  const serviceCell = document.createElement('td');
  const quantityCell = document.createElement('td');
  const sumCell = document.createElement('td');
  const deleteCell = document.createElement('td');
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('deleteRowBtn');

  // Добавляем картинку для кнопки удалить
  const iconBtnDel = document.createElement('img');
  iconBtnDel.src = 'img/del-btn.png';
  iconBtnDel.alt = 'удалить';
  deleteBtn.appendChild(iconBtnDel);

  // Заполняем ячейки данными из формы
  serviceCell.textContent = serviceSelect.options[serviceSelect.selectedIndex].text;
  quantityCell.textContent = quantityInput.value;
  sumCell.textContent = (parseFloat(quantityInput.value) * parseFloat(priceInput.value)).toFixed(2);

  // Добавляем ячейки в новую строку
  newRow.appendChild(serviceCell);
  newRow.appendChild(quantityCell);
  newRow.appendChild(sumCell);
  newRow.appendChild(deleteCell);
  deleteCell.appendChild(deleteBtn);

  // Добавляем новую строку в таблицу перед последней строкой
  tableBody.insertBefore(newRow, tableBody.lastElementChild);

  // Очищаем поля ввода
  serviceSelect.selectedIndex = 0;
  quantityInput.value = '';
  priceInput.value = '';

  // Обновляем итоговые значения
  updateTotals();

  // Добавляем обработчик события на кнопку "Удалить" для новой строки
  deleteBtn.addEventListener('click', deleteRow);
});

// Функция для обновления итоговых значений
function updateTotals() {
  const quantityCells = document.querySelectorAll('#tableSum tbody td:nth-child(2)');
  const sumCells = document.querySelectorAll('#tableSum tbody td:nth-child(3)');

  let totalQuantity = 0;
  let totalSum = 0;

  // Считаем итоговое количество и сумму
  quantityCells.forEach((cell) => {
    totalQuantity += parseFloat(cell.textContent);
  });
  sumCells.forEach((cell) => {
    totalSum += parseFloat(cell.textContent);
  });

  // Выводим итоговые значения в последнюю строку таблицы
  document.getElementById('totalQuantity').textContent = totalQuantity;
  document.getElementById('totalSum').textContent = totalSum.toFixed(2);
}

// Функция для удаления строки
function deleteRow(event) {
  const rowToDelete = event.target.closest('.row');
  rowToDelete.remove();
  updateTotals();
}
