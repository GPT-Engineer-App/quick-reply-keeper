import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Copy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const Index = () => {
  const [responses, setResponses] = useState([]);
  const [newResponse, setNewResponse] = useState({ title: '', content: '' });

  useEffect(() => {
    const savedResponses = localStorage.getItem('linkedinResponses');
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('linkedinResponses', JSON.stringify(responses));
  }, [responses]);

  const addResponse = () => {
    if (newResponse.title && newResponse.content) {
      setResponses([...responses, newResponse]);
      setNewResponse({ title: '', content: '' });
    }
  };

  const deleteResponse = (index) => {
    const updatedResponses = responses.filter((_, i) => i !== index);
    setResponses(updatedResponses);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!");
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">LinkedIn Response Manager</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add New Response</h2>
        <Input
          type="text"
          placeholder="Response Title"
          value={newResponse.title}
          onChange={(e) => setNewResponse({ ...newResponse, title: e.target.value })}
          className="mb-2"
        />
        <Textarea
          placeholder="Response Content"
          value={newResponse.content}
          onChange={(e) => setNewResponse({ ...newResponse, content: e.target.value })}
          className="mb-2"
        />
        <Button onClick={addResponse}>
          <Plus className="mr-2 h-4 w-4" /> Add Response
        </Button>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Saved Responses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {responses.map((response, index) => (
            <Card key={index} className="flex flex-col">
              <CardContent className="flex-grow p-4">
                <h3 className="font-bold mb-2">{response.title}</h3>
                <p className="text-sm mb-4">{response.content}</p>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(response.content)}>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteResponse(index)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
