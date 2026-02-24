export default function Page() {
  return (
    <div>
      <h1>Create Product Category</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
