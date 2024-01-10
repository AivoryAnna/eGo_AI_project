<script lang="ts">
    import Button from '../Button/Button.svelte';
    import Input from '../Input/Input.svelte';

	let subject= '';
    let purpose = '';
	let lowAge = '';
	let upperAge = '';
    let amount = '';
	let lessonType = '';
	let purposeDescription = '';
	let objectiveDescription = '';
	$: lessonPurposePlaceholder = `Write the purpose of the lesson (e.g., ${lessonType ? `${lessonType} ` : ''}the basic concept of addition)`;
	
	let responseMessage = '';

    const handleSubmit = async () => {
		const prompt = `Create a lesson. Lesson type is '${lessonType}'. For example, "Introduction to addition." On '${subject}' for a class of ${amount} 
    kids aged from ${lowAge} to ${upperAge}. The purpose is '${purpose}'.
	${purposeDescription === 'Yes' ? ' Include a detailed academic description of the lesson purpose in one sentence starting with a gerund. For example, "Introduction to the basic concept of addition through developing a fundamental understanding of addition as the combination of quantities."' : ''}
    ${objectiveDescription === 'Yes' ? ' Include 3 academic objectives of the lesson, each in one sentence, starting with a gerund. For example, "Exploring the concept of addition through manipulatives and visuals, such as counting objects, number lines, and picture representations."' : ''}`;

        console.log('Sending prompt to server:', prompt);

        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: prompt })
        });

        const data = await response.json();
        responseMessage = data.reply;
    };
</script>

<form on:submit|preventDefault={handleSubmit}>
    <Input size="small" type="text" bind:value={subject} placeholder="Enter subject (e.g., Math, Art)" />
	<label>
        <input type="radio" bind:group={lessonType} value="Introduction">
        Introduction
    </label>
    <label>
        <input type="radio" bind:group={lessonType} value="Repetition">
        Repetition
    </label>
    <label>
        <input type="radio" bind:group={lessonType} value="Reinforcement">
        Reinforcement
    </label>
	<Input size="small" type="text" bind:value={purpose} placeholder={lessonPurposePlaceholder} />
	<div>
        <label for="lowAge">Age from:</label>
        <input type="number" bind:value={lowAge} min="0" />

        <label for="upperAge">to:</label>
        <input  type="number" bind:value={upperAge}  min="0" />
    </div>
	<div>
        <p>Should AI describe the purpose in more detail?</p>
        <label>
            <input type="radio" bind:group={purposeDescription} value="Yes">
            Yes
        </label>
        <label>
            <input type="radio" bind:group={purposeDescription} value="No">
            No
        </label>
    </div>
	<div>
        <p>Should AI describe the lesson objectives?</p>
        <label>
            <input type="radio" bind:group={objectiveDescription} value="Yes">
            Yes
        </label>
        <label>
            <input type="radio" bind:group={objectiveDescription} value="No">
            No
        </label>
    </div>
	<!-- <Input size="small" type="text" bind:value={theme} placeholder="Describe your situation or decision" /> -->
    <Button type="submit" size="small" label={`Get Lesson`} on:click={handleSubmit} />
    {#if responseMessage}
        <p>{responseMessage}</p>
    {/if}
</form>
