<?php
	if (file_exists('../data/characters-counter.json')) {  
	    $data = file_get_contents('../data/characters-counter.json');  

	    $json_arr = json_decode($data, true);  

	 	$name = str_replace('\\', '', strip_tags($_POST['name']));
		echo $name;

		foreach ($json_arr as $key => $value) {
			if ($value['Name'] == $name) {
				$json_arr[$key]['Selected'] += 1;
			}
		}

	    $data_updated = json_encode($json_arr, JSON_NUMERIC_CHECK);  

	    if(file_put_contents('../data/characters-counter.json', $data_updated)) {  
	        echo $data_updated;
	    }  
	}  
	else {  
	    $error = 'JSON File not exits';  
	}  
?>