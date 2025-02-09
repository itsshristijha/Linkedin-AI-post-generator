import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generatePostContent(template: string, prompt: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional LinkedIn content creator. Create engaging, professional content that drives engagement. Use emojis appropriately and include relevant hashtags."
        },
        {
          role: "user",
          content: `Create a ${template} about ${prompt}. Include emojis and hashtags.`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Failed to generate content. Please try again.');
  }
}

export async function improveContent(content: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional content editor. Improve the given LinkedIn post to make it more engaging and professional while maintaining its core message."
        },
        {
          role: "user",
          content: `Improve this LinkedIn post:\n\n${content}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('Error improving content:', error);
    throw new Error('Failed to improve content. Please try again.');
  }
}

export async function generateHook(topic: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Create an attention-grabbing hook for a LinkedIn post. Use emojis appropriately."
        },
        {
          role: "user",
          content: `Create a hook about: ${topic}`
        }
      ],
      temperature: 0.8,
      max_tokens: 100,
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('Error generating hook:', error);
    throw new Error('Failed to generate hook. Please try again.');
  }
}