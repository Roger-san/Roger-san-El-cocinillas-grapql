import { useQuery, gql } from "@apollo/client"
import React, { useState } from "react"

export default function Searcher({ optionList, setPage, setActualRecipe }) {
    const [inputValue, setInputValue] = useState("")
    const [sendQuery, setSendQuery] = useState(false)

    // saves the input data into the state
    // if the input have the error class is deleted
    const handleChange = (event) => {
        const input = event.target

        const regexp = new RegExp(input.value, "i")

        if(!optionList.names.some(str => str.match(regexp)) && ![...input.classList].includes("error") ){
            input.classList.add("error")
        }
        if(optionList.names.some(str => str.match(regexp)) && [...input.classList].includes("error")){
            input.classList.toggle("error")
        }

        setInputValue(input.value)
    }


    // looks for the searched recipe if doesnt get a recipe
    // toogles the error class in the input
    const GET_RECIPE = gql`
        query findRecipeByName($recipeName: String, $sendQuery: Boolean!) {
            findRecipeByName(recipeName: $recipeName) @skip(if: $sendQuery) {
                author
                recipeName
                description
                ingredients {
                    quantity
                    ingredient
                }
                steps
                frontImage
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_RECIPE, {
        variables: {
            recipeName: inputValue,
            sendQuery,
        },
    });

    if (error) {
        if (sendQuery && ![...document.getElementById("searchInput").classList].includes("error")) {
            document.getElementById("searchInput").classList.toggle("error");
        }
    }

    if (data && Object.keys(data).length !== 0) {
        document.getElementById("searchInput").value = "";
        setInputValue("");
        setSendQuery(false);
        setPage("recipe");
        setActualRecipe(data.findRecipeByName);
    }

    return (
        <form className="form-inline my-2 my-lg-0" >
            <input
                className="form-control mr-sm-2"
                type="search"
                list="search"
                name="search"
                id="searchInput"
                autoComplete="false"
                autoSave="false"
                placeholder="Search"
                onChange={handleChange}
            ></input>
            <datalist id="search">
                {inputValue.length >= 2 && optionList.names.map((recipe, index) => <option key={index} value={recipe}></option>)}
            </datalist>
        </form>
    );
}
