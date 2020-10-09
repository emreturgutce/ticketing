const NewTicket = () => (
  <div>
    <h1>Create a Ticket</h1>
    <form>
      <div className='form-group'>
        <label>Title</label>
        <input type='text' className='form-control' />
      </div>
      <div className='form-group'>
        <label>Title</label>
        <input type='text' className='form-control' />
      </div>
      <button type='submit' className='btn btn-primary'>
        Submit
      </button>
    </form>
  </div>
)

export default NewTicket
