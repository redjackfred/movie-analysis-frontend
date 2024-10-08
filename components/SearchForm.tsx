"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import searchMovie from "@/utils/searchMovie"; // Your async movie search function
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Movie title must be at least 1 character.",
  }),
});

// Define the prop types for the SearchForm
interface SearchFormProps {
  onResults: (results: any) => void; // Adjust type as necessary for your results
}

export default function SearchForm({ onResults }: SearchFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(""); // Reset error state

    try {
      const response = await searchMovie(values.title); // Adjust the argument as needed
      // Call the parent component's callback with the results
      onResults(response); // Send results back to parent
    } catch (err) {
      setError("An error occurred while searching for the movie.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl"></FormLabel>
              <FormControl className=" h-16 text-2xl text-center">
                <Input placeholder="Harry Potter" {...field} />
              </FormControl>
              <FormDescription className="text-xl text-center text-cyan-100">
                Find a movie by its title
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="relative flex justify-center">
          <button type="submit" disabled={loading} className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                {loading ? "Searching..." : "Submit"}
            </div>
          </button>
        </div>
        {error && <div className="text-red-500 text-center">{error}</div>}
      </form>
    </Form>
  );
}
