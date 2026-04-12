import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: any, res: any) {
  // Only allow POST requests (submissions)
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Insert the form data into your Supabase 'contacts' table
    const { error } = await supabase
      .from('contacts') 
      .insert([
        { 
          name, 
          email, 
          subject, 
          message,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Return success to the frontend
    return res.status(200).json({ success: true });

  } catch (error: any) {
    console.error('API Route Error:', error);
    return res.status(500).json({ error: 'Failed to save to database' });
  }
}