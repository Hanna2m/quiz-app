<template>
    <div>
        <div className="header">
            <img
            width="128"
            height="128"
            alt="logo"
            src="../assets/logo.svg"
        />
        <h3>Quiz on any topic</h3>
        </div>
        
        <div className="results-info">
            <h5>Question: {{ countQuestions }}/{{ totalQuestions}}</h5>
            <h5>Correct: {{countCorrect}}</h5>
        </div>
    </div>
</template>

<script>
export default {
    props: ["countCorrect", "totalQuestions", "countQuestions"],
}
</script>

<style scoped>
.header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.results-info {
    margin-left:auto;
    margin-right: auto;
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
}
</style>
