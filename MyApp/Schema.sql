select 
birdid --pkey
,region
,family
,bird --bird name
,latin
,flags
,bird_type
,t_order
,family_rank -- how birds should be orgnized
,color --dont use
,bird_region --dont use
,size --dont use
,habitat --dont use
,rare --dont use
from log;

select 
id --pkey
,username
,password_hash
,insert_date
,email
,is_admin
from alluser;

select 
listid --pkey
,userid --fkey
,title
,created_at
from user_list;

select 
sighting_id --pkey
,birdref --fkey
,userid --fkey
,sighting_time
,listid
from user_sighting;

