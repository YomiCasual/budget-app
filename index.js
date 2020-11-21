class APP {
  constructor() {
  this.budgetFeedback = document.querySelector(".budget-feedback")
  this.budgetInput = document.getElementById("budget-input");
  this.budgetAmount = document.getElementById('budget-amount');
  this.balanceAmount = document.getElementById('balance-amount');
  this.expense = document.getElementById('expense-amount');
  this.budgetForm = document.getElementById('budget-form');
  this.expenseForm = document.getElementById('expense-form')
  this.expenseInput = document.getElementById('expense-input')
  this.expenseAmount = document.getElementById('amount-input')
  this.expenseFeedback = document.querySelector('.expense-feedback')
  this.expenseList =  document.getElementById('expense-list')
  this.budgetDetails = {
    budgetAmount: 0,
    expenseList: []
  }
  // Instantiate once the DOM content Loaded
  this.init()
  }

  init() {
    // add event Listener to the budget form
    this.budgetForm.addEventListener('submit', (e) => {
      e.preventDefault()
      let budgetValue = this.budgetInput.value
      let regex = /\S/
      if (!regex.test(budgetValue)) {
        this.budgetFeedback.classList.add('showItem')
        this.budgetFeedback.innerHTML = 'Please Enter a Valid Budget'
        setTimeout(() => {
          this.budgetFeedback.classList.remove('showItem')
        }, 2000)   
      }
      else {
        this.budgetDetails.budgetAmount = budgetValue
        this.budgetAmount.innerHTML = budgetValue
        this.getBalance()
      }
    })

  //add event Listener to the expense Form
  this.expenseForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let expenseInput = this.expenseInput.value
    let expenseAmount = this.expenseAmount.value
    let regex = /\S/

      if (!regex.test(expenseInput) || !regex.test(expenseAmount)) {
        this.expenseFeedback.classList.add('showItem')
        this.expenseFeedback.innerHTML = 'Please Fill All the Fields'
        setTimeout(() => {
          this.expenseFeedback.classList.remove('showItem')
        }, 2000)  
        return
      } 

    let newExpense = {
      title: expenseInput, 
      amount: expenseAmount,
      id: Math.floor(Math.random() * 1000000)
    }
   
     this.budgetDetails.expenseList = [...this.budgetDetails.expenseList, newExpense ]
      let totalExpense = this.getExpenses()

      //add expense to ui
      ui.addExpense(newExpense)
      //set total expense in innerHTML
      this.expense.innerHTML = totalExpense
  //
      //calculate the balance
      this.getBalance()

      //clear form 
      this.expenseForm.reset()
 
  })

  this.expenseList.addEventListener('click', (e) => {
      e.preventDefault()
    if (e.target.classList.contains('fa-edit')) {
      let item = this.deleteItem(e.target, true)
      this.deleteItem(e.target)
      this.expenseInput.value = item.title
      this.expenseAmount.value = item.amount
    }
    if (e.target.classList.contains('fa-trash')) {
      this.deleteItem(e.target)
    }
  })
}

//delete deleteItem
deleteItem(target, edit) {
  let id = parseInt(target.parentElement.dataset.id )
  let parentElement = target.parentElement.parentElement.parentElement.parentElement
  const { expenseList } = this.budgetDetails
  if (edit) {
    return expenseList.find(item => item.id === id)
  }
  //filter off item from expenseList
  let tempList = expenseList.filter(item => item.id !== id )

  this.budgetDetails.expenseList = tempList

  //get Balance once the item is filtered of the array
  this.expense.innerHTML = this.getExpenses()
  this.getBalance()
  parentElement.remove()
}

//get expenses
getExpenses() {
  const  { expenseList }  = this.budgetDetails
  if (expenseList.length === 0) return 0
 let totalExpense = expenseList.reduce((acc, curr) => {
   return acc += parseInt(curr.amount)
 }, 0)
 return totalExpense
}

// get balance
getBalance() {
const { expenseList, budgetAmount } = this.budgetDetails
if (expenseList.length === 0) {
  this.balanceAmount.innerHTML = budgetAmount
}
else {
  let totalExpense = this.getExpenses()
  const balance = budgetAmount - totalExpense
   this.balanceAmount.innerHTML = balance
}
}
//end of Class
}

const ui = new UI()
const app = new APP()
