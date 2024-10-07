"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input" 

const formSchema = z.object({
    title: z.string().min(1, {
      message: "Movie title must be at least 1 character.",
    }),
  })

export default function SearchForm() {
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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
                <Input placeholder="Harry Potter" {...field}/>
              </FormControl>
              <FormDescription className="text-xl text-center text-cyan-100">
                Find a movie by its title
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="relative flex justify-center">
            <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
};
