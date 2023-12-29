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
sightingid --pkey
,birdref --fkey
,userid --fkey
,sighting_time
,listid
from user_sighting us;


/* ----------------- */

with main as (
        select l.birdid 
            ,l.bird
            ,sighting_time
            ,row_number() over (partition by l.bird order by us.sighting_time asc) as row_num
            ,row_number() over (order by l.family_rank,l.bird asc) as Bird_Position
        from log l
        left join user_sighting us on l.birdid = us.birdref
        left join user_list ul on us.listid = ul.listid
        order by l.family_rank
    ) 
    select row_number() over (order by main.Bird_Position asc) as birdid
    ,main.bird
    ,main.sighting_time 
    from main
    where main.row_num = 1
    order by birdid asc



    select 
    l.birdid
    ,l.bird
    ,cast(us.sighting_time as date) as sighting_time
      from log l
      join user_sighting us on l.birdid = us.birdref
      join user_list ul on us.listid = ul.listid
      order by l.family_rank