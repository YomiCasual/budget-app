

class UI {
  constructor() {
  }
  addExpense(expense) {
    const div = document.createElement('div')
    div.classList.add("expense")

    div.innerHTML = `
        <div class="expense-item d-flex justify-content-between align-items-baseline">
         <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
         <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>
         <div class="expense-icons list-item">
          <a href="#" class="edit-icon mx-2" data-id=${expense.id}>
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id=${expense.id}>
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </div>
                  `
  document.getElementById('expense-list').appendChild(div)
  }
}

