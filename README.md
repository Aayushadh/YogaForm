# Yoga Form

<h3>DataBase Design</h3> 
There is only one table (to avoid complications) named Student which has following fields - 
<ul>
 <li>Email(As a primary key)</li>
 <li>Name</li>
 <li>DOB(for age)</li>
 <li>LastlyPaid(last month when fees was paid)</li>
 <li>Batch(Options - A,B,C,D)</li>
 </ul>


<h3>Setup</h3>
 
<h4>Env Variables</h4>
<p>Create a .env file in then root and add the following</p>
<pre>NODE_ENV = development
PORT = 5000
MONGO_URI = xyz(YOUR_MONGODB_URI)
</pre>

<h4>Install Dependencies</h4>

<pre>npm install
cd frontend
npm install</pre>

<h4>Run</h4>
<pre># Run frontend (:3000) & backend (:5000)
npm run dev</pre>

