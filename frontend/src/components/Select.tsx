import React from 'react'

function Select() {
    const [data, setData]= React.useState({
        category: " ",
        difficulty: " ",
        questioncount: " "
    })

    function handleChange(event){
        const {name,value}=event.target;
        setData(prevData => {
            return {
                ...prevData,
                [name]:value
            }
        })
    }

    function handleSubmit(event){
        event.preventDefault();
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="category"> Select Category </label>
                <select value={data.category} name='category' id="category" onChange={handleChange}>
                    <option value="">Any Category</option>
                    <option value="linux">Linux</option>
                    <option value="bash">Bash</option>
                    <option value="uncategorized">Uncategorized</option>
                    <option value="docker">Docker</option>
                    <option value="sql">SQL</option>
                    <option value="cms">CMS</option>
                    <option value="code">Code</option>
                    <option value="devops">DevOps</option>
            </select>
            </div>
            <div>
                <label htmlFor="difficulty"> Select Difficulty </label>
                <select value={data.difficulty} name='difficulty' id="difficulty" onChange={handleChange}>
                    <option value="">Any Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>
            <div>
                <label htmlFor="questioncount"> Number of Questions </label>
                <input 
                    type="text" 
                    id="questioncount"
                    placeholder='Number of Questions'
                    name="questioncount"
                    value={data.questioncount}
                    onChange={handleChange}
                />
            </div>
        </form>
    </div>
  )
}

export default Select