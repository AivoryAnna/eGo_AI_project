<script lang="ts">
	import Button from '../Button/Button.svelte';
	import Input from '../Input/Input.svelte';
	import './form.css';

	let name = '';
	let lowAge = '';
	let upperAge = '';
	let date = '';
	let subject = '';
	let purpose = '';
	let amount = '';
	let lessonType = '';
	let purposeDescription = '';
	let studentFactors = '';
	let objectiveDescription = '';
	$: lessonPurposePlaceholder = `Write the purpose of the lesson (e.g., ${
		lessonType ? `${lessonType} ` : ''
	}the basic concept of addition)`;

	let responseMessage = '';

	const handleSubmit = async () => {
		const prompt = ` Write it all in the language of the user's request. Create a lesson plan in the language of the user's request with format:
        ${name != null ? `Teacher: ${name}` : 'Do not write any.'}
        Student age: from '${lowAge}' to '${upperAge}'
        ${date != null ? `Date : ${date}` : 'Do not write any.'}
        Subject: '${subject}',
        Plan title: create a plan title based on '${purpose}' and '${lessonType}, ',
        Purpose: ${
					purposeDescription === 'Yes'
						? ' Include a detailed academic description of the lesson purpose in one sentence starting with a gerund. For example, "Purpose: Introduction to the basic concept of addition through developing a fundamental understanding of addition as the combination of quantities."'
						: 'Include a short academic description of the lesson purpose in one sentence starting with a gerund.'
				},
    ${
			objectiveDescription === 'Yes'
				? ' Objectives: Include 3 academic objectives of the lesson, each in one sentence, starting with a gerund. For example, "Objectives: Exploring the concept of addition through manipulatives and visuals, such as counting objects, number lines, and picture representations."'
				: 'do not write any objectives'
		},
        Student Factors:  
        ${
					parseInt(amount) >= 1
						? 'Number of kids: describe number of kids'
						: 'It/s an individual lesson.'
				}. 
        ${studentFactors != null ? 'Describe every student factors' : 'Do not write any'},
        Lesson plan:
        Describe a detailed lesson plan with the inclusion of the tasks you suggested, suitable for this purpose and age of students. Where a lecture format is required from the educator, please write out the educator's speech in full.  
        When constructing tasks and the lesson, take into account students factors (if they are exist) and  all provided data, such as:
        ${lowAge}, ${upperAge}, ${purpose}, ${lessonType}, ${amount} kids in group. 
        Highlight each part of the lesson with a title based on the unformation provided. 
        Evenly distribute the lesson time according to the psychological features of the age group and indicate the allocated time in the title of each part of the lesson. 
        If there are specific students factors, distribute the time considering the percentage of such children in the overall group and highlight parts according to their needs.
        If the duration of the lesson is not specified, calculate the lesson to last 45 minutes. 
        `;

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

<form on:submit|preventDefault={handleSubmit} class="storybook-form">
	<Input
		size="large"
		type="text"
		bind:value={subject}
		placeholder="Enter subject (e.g., Math, Art)"
		primary={true}
	/>

	<div class="lessonOption">
		<label for="option1">
			Introduction
			<Input type="radio" id="option1" bind:group={lessonType} value="Introduction" />
		</label>
		<label for="option2"
			>Repetition
			<Input type="radio" id="option2" bind:group={lessonType} value="Repetition" />
		</label>
		<label for="option3"
			>Reinforcement
			<Input type="radio" id="option3" bind:group={lessonType} value="Reinforcement" />
		</label>
	</div>

	<Input
		size="large"
		type="text"
		bind:value={purpose}
		placeholder={lessonPurposePlaceholder}
		primary={true}
	/>
	<div class="lessonAge">
		<label for="lowAge"
			>Age from:
			<Input type="number" bind:value={lowAge} min="0" primary={true} />
		</label>

		<label for="upperAge">
			to:
			<Input type="number" bind:value={upperAge} min="0" primary={true} />
		</label>
	</div>
	<div class="lessonPurpose">
		<p>Should we describe the purpose in more detail?</p>
		<div class='inputPurpose'>
			<label for="purpose1">
				Yes, I need more details
				<Input type="radio" id='purpose1' bind:group={purposeDescription} value="Yes" />
			</label>
			<label for="purpose2">
				No
				<Input type="radio" id='purpose2' bind:group={purposeDescription} value="No" />
			</label>
		</div>
	</div>
	<div>
		<p>Should AI describe the lesson objectives?</p>
		<label>
			<input type="radio" bind:group={objectiveDescription} value="Yes" />
			Yes
		</label>
		<label>
			<input type="radio" bind:group={objectiveDescription} value="No" />
			No
		</label>
	</div>
	<div>
		<label for="lowAge">Number of kids:</label>
		<input type="number" bind:value={amount} min="1" />
	</div>
	<Input
		size="large"
		type="text"
		bind:value={studentFactors}
		placeholder="Describe student factots and number of them (e.g., Five hyperactive children and one child with autism)"
		primary={true}
	/>
	<Button type="submit" size="small" label={`Get Lesson`} on:click={handleSubmit} />
	{#if responseMessage}
		<div style="white-space: pre-line;">{responseMessage}</div>
	{/if}
</form>
